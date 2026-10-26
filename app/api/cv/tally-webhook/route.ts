import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { Resend } from "resend";
import mammoth from "mammoth";
import { checkPaidSession } from "@/lib/stripe-check";

export const runtime = "nodejs";
export const maxDuration = 60;

// Tally -> (this route) -> Claude drafts the CV -> email to Diego for review.
// Nothing is ever sent to the customer automatically: Diego reviews the draft
// and replies from hello@oncallnetwork.com.au.

type TallyField = {
  key?: string;
  label?: string;
  type?: string;
  value?: unknown;
  options?: { id: string; text: string }[];
};

type TallyFile = { name?: string; url?: string; mimeType?: string; size?: number };

const SYSTEM_PROMPT = `You are a senior hospitality recruiter in Australia with 4 years of experience hiring in Sydney. Rewrite the candidate's CV to strict Australian format.

Rules:
1. Maximum 1 page. Remove photo references, date of birth, marital status and nationality.
2. Structure: Professional Summary (max 3 lines) / Availability and Work Rights / Experience (reverse chronological, achievements with action verbs and real numbers only) / Certificates (RSA and RSG prominent if held) / Education and Languages.
3. NEVER invent data, dates, venues or numbers. If something important is missing, write [COMPLETAR: what is missing].
4. If English level is Basic, use short, simple sentences.
5. Write the CV in Australian English (organised, colour).

Deliver, in this order, with these exact headings:
## CV
## COVER LETTER (150 words, with [Venue] and [Role] placeholders)
## CHECKLIST (5 practical improvements for the candidate)
## QUESTIONS FOR CANDIDATE (list every [COMPLETAR] item)`;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function verifySignature(raw: string, header: string | null): boolean {
  const secret = process.env.TALLY_SIGNING_SECRET;
  if (!secret || !header) return false;
  const expected = crypto.createHmac("sha256", secret).update(raw).digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function fieldText(f: TallyField): string {
  const v = f.value;
  if (v == null) return "";
  if (Array.isArray(v)) {
    return v
      .map((item) => {
        if (typeof item === "string") {
          const opt = f.options?.find((o) => o.id === item);
          return opt ? opt.text : item;
        }
        return "";
      })
      .filter(Boolean)
      .join(", ");
  }
  if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
    const opt = f.options?.find((o) => o.id === v);
    return opt ? opt.text : String(v);
  }
  return "";
}

async function buildCvContent(file: TallyFile | undefined): Promise<
  { blocks: unknown[]; note?: string }
> {
  if (!file?.url) return { blocks: [], note: "No CV file was attached." };
  const res = await fetch(file.url);
  if (!res.ok) return { blocks: [], note: `CV file could not be downloaded (${res.status}).` };
  const buf = Buffer.from(await res.arrayBuffer());
  const name = (file.name || "").toLowerCase();
  const mime = (file.mimeType || "").toLowerCase();

  if (mime.includes("pdf") || name.endsWith(".pdf")) {
    return {
      blocks: [
        {
          type: "document",
          source: { type: "base64", media_type: "application/pdf", data: buf.toString("base64") },
        },
      ],
    };
  }
  if (name.endsWith(".docx") || mime.includes("wordprocessingml")) {
    const { value } = await mammoth.extractRawText({ buffer: buf });
    return { blocks: [{ type: "text", text: `CURRENT CV TEXT:\n\n${value}` }] };
  }
  return { blocks: [], note: `Unsupported CV file type (${file.mimeType || file.name}). Process it manually.` };
}

async function draftCv(formSummary: string, cvBlocks: unknown[]): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error("ANTHROPIC_API_KEY is not set");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            ...cvBlocks,
            { type: "text", text: `CANDIDATE FORM ANSWERS:\n${formSummary}` },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { content?: { type: string; text?: string }[] };
  return (data.content || []).map((c) => (c.type === "text" ? c.text || "" : "")).join("\n").trim();
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!verifySignature(raw, req.headers.get("tally-signature"))) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let payload: { eventType?: string; data?: { responseId?: string; fields?: TallyField[] } };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  if (payload.eventType !== "FORM_RESPONSE") return NextResponse.json({ ok: true, skipped: true });

  const fields = payload.data?.fields ?? [];
  const byLabel = (needle: string) =>
    fields.find((f) => (f.label || "").toLowerCase().includes(needle.toLowerCase()));

  const sessionId = fieldText(byLabel("session_id") ?? {});
  const customerEmail = fieldText(byLabel("email") ?? {});
  const customerName = fieldText(byLabel("full name") ?? {}) || "Customer";
  const paid = await checkPaidSession(sessionId);

  const notify = process.env.RESEND_NOTIFY_TO || "hello@oncallnetwork.com.au";
  const from = process.env.RESEND_FROM || "On Call Network <hello@oncallnetwork.com.au>";
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ error: "RESEND_API_KEY missing" }, { status: 500 });
  const resend = new Resend(resendKey);

  const formSummary = fields
    .filter((f) => f.type !== "FILE_UPLOAD" && f.type !== "HIDDEN_FIELDS")
    .map((f) => `${f.label}: ${fieldText(f) || "(blank)"}`)
    .join("\n");

  const fileField = fields.find((f) => f.type === "FILE_UPLOAD");
  const file = Array.isArray(fileField?.value) ? (fileField!.value as TallyFile[])[0] : undefined;

  let body: string;
  let status = paid.paid ? "PAID" : "NOT VERIFIED AS PAID";
  try {
    if (!paid.paid) {
      body = "No verified Stripe payment for this submission, so no draft was generated. Check Stripe before doing any work.";
    } else {
      const cv = await buildCvContent(file);
      if (cv.note) {
        body = `${cv.note}\n\nForm answers:\n${formSummary}`;
      } else {
        body = await draftCv(formSummary, cv.blocks);
      }
    }
  } catch (error) {
    console.error("[cv-webhook] draft failed", error);
    body = `Automatic draft failed (${(error as Error).message}). Process this one manually.\n\nForm answers:\n${formSummary}`;
  }

  const html = `<div style="font-family:system-ui,sans-serif;max-width:720px">
    <p><strong>Status:</strong> ${escapeHtml(status)} &middot; <strong>Customer:</strong> ${escapeHtml(customerName)} (${escapeHtml(customerEmail || paid.email || "no email")})</p>
    ${file?.url ? `<p><a href="${escapeHtml(file.url)}">Original CV file</a></p>` : ""}
    <p><em>Draft for your review. Check every line against the original CV, fill the [COMPLETAR] items, then send to the customer from hello@oncallnetwork.com.au.</em></p>
    <pre style="white-space:pre-wrap;font-family:inherit;border-top:1px solid #ddd;padding-top:12px">${escapeHtml(body)}</pre>
  </div>`;

  await resend.emails.send({
    from,
    to: notify,
    subject: `[CV order] ${customerName} - ${status}`,
    html,
    replyTo: customerEmail || paid.email || undefined,
  });

  return NextResponse.json({ ok: true });
}
