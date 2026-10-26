import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { Resend } from "resend";
import mammoth from "mammoth";
import { checkPaidSession } from "@/lib/stripe-check";
import { extractSection, textToDocx } from "@/lib/cv-docx";

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

const SYSTEM_PROMPT = `You are a senior Australian recruiter with 4 years of experience hiring in Sydney hospitality (venues, hotels, cafes, events, agencies) and a working knowledge of how ATS software parses CVs. You rewrite a candidate's CV so that it (1) parses cleanly in ATS (Workable, SEEK, Greenhouse, Lever, Employment Hero, Sidekicker), (2) survives the first 10-second recruiter scan and the phone-screen knock-out questions, and (3) is 100% truthful.

TRUTH RULES (highest priority)
- Use ONLY facts in the original CV and the form answers. NEVER invent or inflate employers, dates, titles, numbers, certificates, visa status or skills.
- Missing but important info: write [COMPLETAR: exactly what is missing]. Do not guess.
- Numbers (covers, team size, revenue, hours) only if the candidate gave them. Otherwise describe scope qualitatively (e.g. "high-volume venue") and ask in QUESTIONS.
- If the candidate's dates have gaps over 3 months, do not hide them: keep real dates and add the gap to QUESTIONS with a suggested honest one-line explanation (travel, study, visa, family) for the candidate to confirm.

ATS FORMAT RULES
- Plain single-column text. No tables, text boxes, columns, icons, photos, graphics, emojis, headers/footers or skill bars. Use simple hyphen bullets.
- Exact standard headings in this order: PROFESSIONAL SUMMARY, KEY SKILLS, WORK EXPERIENCE, CERTIFICATES AND LICENCES, EDUCATION, LANGUAGES, REFEREES. (Omit a heading only if truly empty; never rename them.)
- Contact line at top: Full name / Suburb, State / Mobile (Australian format) / Email / LinkedIn if provided. No street address, date of birth, age, marital status, nationality or photo.
- Dates as "Mon YYYY - Mon YYYY" or "Mon YYYY - Present". Each job: Job Title | Venue Name | Suburb | dates. Reverse chronological. Use the exact job titles real Australian job ads use (e.g. Barista, Bartender, Waitstaff, Food and Beverage Attendant, Kitchen Hand, Chef de Partie, Venue Manager).
- Mirror the keywords of the target role the candidate states (e.g. RSA, RCG, POS, Lightspeed, Square, Aloha, table service, cocktail making, espresso, latte art, barista, cash handling, rostering, food safety, HACCP, allergen awareness, EFTPOS, events, banquet, opening and closing, stock control). Include a keyword ONLY if the candidate has that skill.
- Length: 1 page for under 5 years' experience, max 2 pages otherwise. Keep roughly the last 10 years; compress older roles to one line.

CONTENT RULES
- PROFESSIONAL SUMMARY: 3 lines max: role + years of experience + 2-3 strongest relevant strengths + availability. No clichés ("hard-working team player", "passionate").
- Place work rights and availability in the summary or right below it so they are seen first: visa type and work-hour limits as the candidate stated them (e.g. "Working Holiday visa (subclass 417/462), full work rights, available immediately"; "Student visa, 48 hours per fortnight during study periods"). If unclear, [COMPLETAR].
- KEY SKILLS: 8-12 short items, hospitality-relevant, truthful, ATS-friendly.
- WORK EXPERIENCE: 3-5 bullets per role (fewer for old roles), each starting with a strong past-tense verb, showing responsibility + result/scale (Served, Prepared, Trained, Handled, Opened/Closed, Managed, Reduced, Upsold). No first person, no "responsible for".
- CERTIFICATES AND LICENCES: RSA (NSW) and RCG/RSG prominent when held, with state and expiry/year if given; Food Safety Supervisor, First Aid/CPR, WWCC, forklift, etc. Never list a certificate the candidate does not hold. Do not claim "available to work" beyond what they stated.
- Write in Australian English (organised, programme only if relevant, colour, licence as noun, enrolment). If the candidate's English level is Basic, keep sentences short and simple; if the original CV has errors, fix them silently.
- Remove: photo, date of birth, nationality, marital status, "References available on request" filler (use REFEREES only if names are provided, otherwise one line "Available on request").

DELIVER, in this order, with these exact headings:
## CV
(the full ATS-ready CV in plain text)
## COVER LETTER
(150-180 words, Australian tone, direct, with [Venue] and [Role] placeholders, mentions availability and work rights, one concrete strength from the CV, a clear closing)
## SCREENING PREP
(the 6 questions a Sydney hospitality recruiter most likely asks in the first phone screen for this candidate's target role, e.g. work rights and hours, availability and roster, RSA/RCG status, transport/suburb, experience with the venue type, why this role, and a 2-line suggested honest answer for each, built only from the candidate's real data; mark [COMPLETAR] where unknown)
## CHECKLIST
(5 practical, specific improvements for the candidate: where to apply, LinkedIn/SEEK profile tweaks, certificates to obtain if missing, how to follow up, how to name the file e.g. Firstname_Lastname_CV.pdf)
## QUESTIONS FOR CANDIDATE
(every [COMPLETAR] item and every gap or inconsistency found, as a numbered list Diego can paste into an email)
## REVIEWER NOTES (INTERNAL, DO NOT SEND)
(for Diego only: 3-6 bullets on risks to verify before sending: unverifiable claims, date inconsistencies, anything inferred, ATS risks, whether the candidate's target role matches their experience)`;

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
      max_tokens: 6000,
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

  // Word attachments (only when a real draft was generated)
  const attachments: { filename: string; content: Buffer }[] = [];
  let drafted = false;
  if (paid.paid && /^## CV/m.test(body)) {
    try {
      const safe = customerName.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "") || "Candidate";
      const cvText = extractSection(body, "CV");
      const letter = extractSection(body, "COVER LETTER");
      const prep = [extractSection(body, "SCREENING PREP"), extractSection(body, "CHECKLIST")].filter(Boolean).join("\n\n");
      if (cvText) attachments.push({ filename: `${safe}_CV.docx`, content: await textToDocx(cvText, { nameFirstLine: true }) });
      if (letter) attachments.push({ filename: `${safe}_Cover_Letter.docx`, content: await textToDocx(letter) });
      if (prep) attachments.push({ filename: `${safe}_Phone_Screen_Prep.docx`, content: await textToDocx(prep) });
      drafted = attachments.length > 0;
    } catch (error) {
      console.error("[cv-webhook] docx failed", error);
    }
  }

  const firstName = customerName.split(" ")[0] || "there";
  const reply = `Hi ${firstName},\n\nYour Australian CV, cover letter and phone-screen prep are attached as Word files. Everything is based on your own details; if anything is not right, reply to this email within 7 days and I will update it for free.\n\nOne tip: save your CV as a PDF named ${customerName.replace(/\s+/g, "_")}_CV.pdf before sending it to employers.\n\nGood luck,\nDiego\nOn Call Network`;

  const html = `<div style="font-family:system-ui,sans-serif;max-width:720px">
    <p><strong>Status:</strong> ${escapeHtml(status)} &middot; <strong>Customer:</strong> ${escapeHtml(customerName)} (${escapeHtml(customerEmail || paid.email || "no email")})</p>
    ${file?.url ? `<p><a href="${escapeHtml(file.url)}">Original CV file</a></p>` : ""}
    ${drafted ? `<p><strong>Review checklist:</strong> 1) read REVIEWER NOTES below, 2) check the attached .docx against the original CV, 3) fill every [COMPLETAR] (or ask the customer using QUESTIONS), 4) forward the .docx files to the customer with the reply text below. The internal notes are NOT in the attachments.</p>` : `<p><em>No attachments generated. Process manually.</em></p>`}
    <p><strong>Suggested reply to customer:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;background:#f5f5f5;padding:10px">${escapeHtml(reply)}</pre>
    <p><em>Full draft:</em></p>
    <pre style="white-space:pre-wrap;font-family:inherit;border-top:1px solid #ddd;padding-top:12px">${escapeHtml(body)}</pre>
  </div>`;

  await resend.emails.send({
    from,
    to: notify,
    subject: `[CV order] ${customerName} - ${status}`,
    html,
    replyTo: customerEmail || paid.email || undefined,
    attachments: attachments.length ? attachments : undefined,
  });

  return NextResponse.json({ ok: true });
}
