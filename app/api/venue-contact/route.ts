import { NextRequest, NextResponse } from "next/server";
import {
  createVenueRecord,
  createCandidateApplicationRecord,
  type VenueRecord,
  type CandidateApplicationRecord,
} from "@/lib/airtable";
import { put } from "@vercel/blob";
import { z } from "zod";
import { limit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  sendVenueConfirmation,
  sendVenueInternalNotice,
  sendCandidateConfirmation,
  sendCandidateInternalNotice,
} from "@/lib/email";

export const runtime = "nodejs";

const venueSchema = z.object({
  formType: z.literal("venue").optional().default("venue"),
  serviceType: z.enum([
    "Permanent Placement (18% of annual salary)",
    "Casual Introduction ($99 per intro)",
    "Priority plan (enquire)",
    "Venue partner (enquire)",
    "General Enquiry",
  ]),
  venueName: z.string().trim().min(1, "Venue name is required").max(120),
  contactPerson: z.string().trim().min(1, "Contact name is required").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  suburb: z.string().trim().max(120).optional().default(""),
  positionsNeeded: z.string().trim().max(120).optional().default(""),
  immediateNeed: z.string().trim().max(120).optional().default(""),
  additionalNotes: z.string().trim().max(2000).optional().default(""),
  consentAccepted: z.literal(true, {
    errorMap: () => ({
      message: "Please accept the Privacy Policy and Terms and Conditions.",
    }),
  }),
  turnstileToken: z.string().optional(),
  website: z.string().optional(),
});

const candidateSchema = z.object({
  formType: z.literal("candidate"),
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  suburb: z.string().trim().min(1, "Suburb is required").max(120),
  roleApplyingFor: z.string().trim().min(1, "Role applying for is required").max(120),
  yearsInAustralia: z.string().trim().min(1, "Years of experience is required").max(60),
  currentVenue: z.string().trim().min(1, "Current or most recent venue is required").max(200),
  certifications: z.array(z.string().max(60)).min(1, "Select at least one certification"),
  availability: z.string().trim().min(1, "Availability is required").max(60),
  preferredZones: z.array(z.string().max(60)).min(1, "Select at least one preferred zone"),
  employmentType: z.array(z.string().max(60)).min(1, "Select at least one employment type"),
  briefIntro: z.string().trim().min(30, "Brief intro must be at least 30 characters").max(300),
  legalConfirmation: z.literal(true),
  termsAccepted: z.literal(true),
  turnstileToken: z.string().optional(),
  website: z.string().optional(),
});

function parseListField(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value !== "string") return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed.filter((v): v is string => typeof v === "string");
    }
  } catch {
    // Fallback to comma-separated values.
  }
  return trimmed.split(",").map((v) => v.trim()).filter(Boolean);
}

async function uploadCandidateFile(file: File, prefix: "cv" | "rsa"): Promise<string> {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const safeName = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const uploaded = await put(safeName, file, {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return uploaded.url;
}

function tooMany(retryAfter: number) {
  return NextResponse.json(
    {
      success: false,
      message: `Too many requests. Please try again in ${retryAfter} seconds.`,
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const rl = limit(`contact:${ip}`, { max: 5, windowSeconds: 60 });
    if (!rl.ok) return tooMany(rl.retryAfterSeconds);

    const contentType = request.headers.get("content-type") ?? "";
    const isMultipart = contentType.includes("multipart/form-data");
    const body = isMultipart ? null : await request.json();
    const formData = isMultipart ? await request.formData() : null;
    const payload = isMultipart
      ? {
          formType: String(formData?.get("formType") ?? ""),
          fullName: String(formData?.get("fullName") ?? ""),
          email: String(formData?.get("email") ?? ""),
          phone: String(formData?.get("phone") ?? ""),
          suburb: String(formData?.get("suburb") ?? ""),
          roleApplyingFor: String(formData?.get("roleApplyingFor") ?? ""),
          yearsInAustralia: String(formData?.get("yearsInAustralia") ?? ""),
          currentVenue: String(formData?.get("currentVenue") ?? ""),
          certifications: parseListField(formData?.get("certifications")),
          availability: String(formData?.get("availability") ?? ""),
          preferredZones: parseListField(formData?.get("preferredZones")),
          employmentType: parseListField(formData?.get("employmentType")),
          briefIntro: String(formData?.get("briefIntro") ?? ""),
          legalConfirmation: String(formData?.get("legalConfirmation")) === "true",
          termsAccepted: String(formData?.get("termsAccepted")) === "true",
          turnstileToken: String(formData?.get("turnstileToken") ?? ""),
          website: String(formData?.get("website") ?? ""),
          cvFile: formData?.get("cvFile"),
          rsaCertificateFile: formData?.get("rsaCertificateFile"),
        }
      : body;

    if (payload.website && String(payload.website).trim().length > 0) {
      return NextResponse.json({ success: true, message: "Received" });
    }

    if (payload.formType === "candidate") {
      const parsed = candidateSchema.safeParse(payload);
      if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
        return NextResponse.json({ success: false, message: firstError }, { status: 400 });
      }

      const cvFile = isMultipart ? payload.cvFile : null;
      const rsaFile = isMultipart ? payload.rsaCertificateFile : null;
      if (!(cvFile instanceof File) || !(rsaFile instanceof File)) {
        return NextResponse.json(
          { success: false, message: "CV and RSA Certificate files are required." },
          { status: 400 }
        );
      }

      const turnstile = await verifyTurnstile(parsed.data.turnstileToken, ip);
      if (!turnstile.ok) {
        return NextResponse.json({ success: false, message: turnstile.message }, { status: 400 });
      }

      const [cvUrl, rsaUrl] = await Promise.all([
        uploadCandidateFile(cvFile, "cv"),
        uploadCandidateFile(rsaFile, "rsa"),
      ]);
      const certifications = parsed.data.certifications;
      const yearsNum = Number(parsed.data.yearsInAustralia.replace(/[^\d.]/g, ""));

      const candidateRecord: CandidateApplicationRecord = {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        suburb: parsed.data.suburb,
        roleApplyingFor: parsed.data.roleApplyingFor,
        yearsInAustralia: Number.isFinite(yearsNum) ? yearsNum : 0,
        currentVenue: parsed.data.currentVenue,
        hasRSA: certifications.includes("RSA"),
        hasRCG: certifications.includes("RCG"),
        hasFoodSafety: certifications.includes("Food Safety"),
        hasFirstAid: certifications.includes("First Aid"),
        availability: parsed.data.availability,
        preferredZones: parsed.data.preferredZones.join(", "),
        employmentType: parsed.data.employmentType.join(", "),
        briefIntro: parsed.data.briefIntro,
        registrationDate: new Date().toISOString(),
        status: "New Application",
        cvAttachment: [{ url: cvUrl }],
        rsaCertificateAttachment: [{ url: rsaUrl }],
      };

      const { id } = await createCandidateApplicationRecord(candidateRecord);

      await Promise.allSettled([
        sendCandidateConfirmation(parsed.data.email, parsed.data.fullName, parsed.data.roleApplyingFor),
        sendCandidateInternalNotice({
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          suburb: parsed.data.suburb,
          roleApplyingFor: parsed.data.roleApplyingFor,
          yearsInAustralia: parsed.data.yearsInAustralia,
          currentVenue: parsed.data.currentVenue,
          certifications: parsed.data.certifications.join(", "),
          availability: parsed.data.availability,
          preferredZones: parsed.data.preferredZones.join(", "),
          employmentType: parsed.data.employmentType.join(", "),
          briefIntro: parsed.data.briefIntro,
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: "Application received successfully",
        recordId: id,
      });
    }

    const parsedVenue = venueSchema.safeParse({
      formType: "venue",
      serviceType: payload.serviceType,
      venueName: payload.venueName,
      contactPerson: payload.contactPerson ?? payload.contactName,
      email: payload.email,
      phone: payload.phone,
      suburb: payload.suburb ?? "",
      positionsNeeded: payload.positionsNeeded ?? "",
      immediateNeed: payload.immediateNeed ?? "",
      additionalNotes: payload.additionalNotes ?? payload.message ?? "",
      consentAccepted: payload.consentAccepted,
      turnstileToken: payload.turnstileToken,
      website: payload.website,
    });

    if (!parsedVenue.success) {
      const errors = parsedVenue.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
      return NextResponse.json({ success: false, message: firstError }, { status: 400 });
    }

    const turnstile = await verifyTurnstile(parsedVenue.data.turnstileToken, ip);
    if (!turnstile.ok) {
      return NextResponse.json({ success: false, message: turnstile.message }, { status: 400 });
    }

    const consentTimestamp = new Date().toISOString();

    const venueRecord: VenueRecord = {
      serviceType: parsedVenue.data.serviceType,
      venueName: parsedVenue.data.venueName,
      contactPerson: parsedVenue.data.contactPerson,
      email: parsedVenue.data.email,
      phone: parsedVenue.data.phone,
      suburb: parsedVenue.data.suburb || undefined,
      positionsNeeded: parsedVenue.data.positionsNeeded || undefined,
      immediateNeed: parsedVenue.data.immediateNeed || undefined,
      additionalNotes: parsedVenue.data.additionalNotes || undefined,
      consentTimestamp,
    };

    const { id } = await createVenueRecord(venueRecord);

    await Promise.allSettled([
      sendVenueConfirmation(
        parsedVenue.data.email,
        parsedVenue.data.contactPerson,
        parsedVenue.data.serviceType
      ),
      sendVenueInternalNotice({
        serviceType: parsedVenue.data.serviceType,
        venueName: parsedVenue.data.venueName,
        contactPerson: parsedVenue.data.contactPerson,
        email: parsedVenue.data.email,
        phone: parsedVenue.data.phone,
        suburb: parsedVenue.data.suburb,
        positionsNeeded: parsedVenue.data.positionsNeeded,
        additionalNotes: parsedVenue.data.additionalNotes,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Request received successfully",
      recordId: id,
    });
  } catch (error) {
    console.error("Venue contact error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit request";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
