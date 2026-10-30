import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createDjEnquiryRecord } from "@/lib/airtable";
import { limit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendDjEnquiryConfirmation, sendDjInternalNotice } from "@/lib/email";
import { DJ, guessZone, packageById } from "@/lib/dj";

export const runtime = "nodejs";

const FALLBACK_MESSAGE =
  "We couldn't send your enquiry just now. Please email hello@oncallnetwork.com.au and we will reply the same business day.";

function sydneyToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Sydney" }).format(new Date());
}

const schema = z.object({
  fullName: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\-\s]*$/, "Phone number can only contain digits, spaces and + ( ) -")
    .optional()
    .default(""),
  company: z.string().trim().max(120).optional().default(""),
  eventType: z.enum(DJ.eventTypes as unknown as [string, ...string[]], {
    errorMap: () => ({ message: "Please choose an event type" }),
  }),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter the event date")
    .refine((d) => d >= sydneyToday(), "The event date can't be in the past"),
  venueAndSuburb: z.string().trim().min(2, "Please enter the venue and suburb").max(200),
  startTime: z.string().trim().max(5).optional().default(""),
  endTime: z.string().trim().max(5).optional().default(""),
  guests: z.coerce.number().int().min(1).max(5000).optional(),
  venueHasSoundSystem: z.enum(["Yes", "No", "Not sure"]).default("Not sure"),
  package: z.enum(["essentials", "signature", "premium", "not-sure"]).default("not-sure"),
  message: z.string().trim().max(2000).optional().default(""),
  sourcePage: z.string().trim().max(200).optional().default(""),
  consentAccepted: z.literal(true, {
    errorMap: () => ({ message: "Please accept the Privacy Policy and Terms and Conditions." }),
  }),
  turnstileToken: z.string().optional(),
  website: z.string().optional(),
});

function tooMany(retryAfter: number) {
  return NextResponse.json(
    { success: false, message: `Too many requests. Please try again in ${retryAfter} seconds.` },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const rl = limit(`dj:${ip}`, { max: 5, windowSeconds: 60 });
    if (!rl.ok) return tooMany(rl.retryAfterSeconds);

    const raw = await request.json().catch(() => null);
    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }

    // Honeypot: pretend success, store nothing.
    if (typeof raw.website === "string" && raw.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Received" });
    }

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Please check the form and try again";
      return NextResponse.json({ success: false, message: firstError }, { status: 400 });
    }
    const d = parsed.data;

    const turnstile = await verifyTurnstile(d.turnstileToken, ip);
    if (!turnstile.ok) {
      return NextResponse.json({ success: false, message: turnstile.message }, { status: 400 });
    }

    const pkg = packageById(d.package);
    const packageName = pkg ? pkg.name : "Not sure";
    const needsPaRental = d.venueHasSoundSystem !== "Yes" && d.package !== "essentials";
    const zoneGuess = guessZone(d.venueAndSuburb);
    const sourcePage = d.sourcePage.startsWith("/") ? d.sourcePage : "/dj-hire-sydney";

    let recordSaved = false;
    try {
      await createDjEnquiryRecord({
        fullName: d.fullName,
        email: d.email,
        phone: d.phone || undefined,
        company: d.company || undefined,
        eventType: d.eventType,
        eventDate: d.eventDate,
        venueAndSuburb: d.venueAndSuburb,
        startTime: d.startTime || undefined,
        endTime: d.endTime || undefined,
        guests: d.guests,
        venueHasSoundSystem: d.venueHasSoundSystem,
        packageName,
        message: d.message || undefined,
        needsPaRental,
        zoneGuess,
        sourcePage,
      });
      recordSaved = true;
    } catch (error) {
      // Loud on purpose (check AIRTABLE_DJ_TABLE and the table's columns), but we
      // still email the enquiry so a paying lead is never lost.
      console.error("[dj-enquiry] Airtable write FAILED", error);
    }

    const noticeSent = await sendDjInternalNotice(
      {
        Name: d.fullName,
        Email: d.email,
        Phone: d.phone,
        Company: d.company,
        "Event type": d.eventType,
        "Event date": d.eventDate,
        Venue: d.venueAndSuburb,
        Time: [d.startTime, d.endTime].filter(Boolean).join(" to "),
        Guests: d.guests ? String(d.guests) : "",
        "Venue has sound system": d.venueHasSoundSystem,
        Package: packageName,
        "Zone guess": zoneGuess,
        "Needs PA rental": needsPaRental ? "Yes" : "No",
        Message: d.message,
        "Saved to Airtable": recordSaved ? "Yes" : "NO - check logs",
      },
      d.email,
      `${d.fullName} (${d.eventType})`
    );

    if (!recordSaved && !noticeSent) {
      return NextResponse.json({ success: false, message: FALLBACK_MESSAGE }, { status: 500 });
    }

    await sendDjEnquiryConfirmation(d.email, d.fullName, d.eventType);

    return NextResponse.json({ success: true, message: "Enquiry received" });
  } catch (error) {
    console.error("[dj-enquiry] unexpected error", error);
    return NextResponse.json({ success: false, message: FALLBACK_MESSAGE }, { status: 500 });
  }
}
