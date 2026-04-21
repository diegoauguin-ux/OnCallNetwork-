import { NextRequest, NextResponse } from "next/server";
import {
  createVenueRecord,
  createCandidateApplicationRecord,
  type VenueRecord,
  type CandidateApplicationRecord,
} from "@/lib/airtable";
import { z } from "zod";

const venueSchema = z.object({
  formType: z.literal("venue").optional().default("venue"),
  serviceType: z.enum([
    "Permanent Placement (18% of annual salary)",
    "Casual Introduction ($99 per intro)",
    "Priority plan (enquire)",
    "Venue partner (enquire)",
    "General Enquiry",
  ]),
  venueName: z.string().min(1, "Venue name is required"),
  contactPerson: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  suburb: z.string().optional().default(""),
  positionsNeeded: z.string().optional().default(""),
  immediateNeed: z.string().optional().default(""),
  additionalNotes: z.string().optional().default(""),
  consentAccepted: z.literal(true, {
    errorMap: () => ({
      message: "Please accept the Privacy Policy and Terms and Conditions.",
    }),
  }),
});

const candidateSchema = z.object({
  formType: z.literal("candidate"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  suburb: z.string().min(1, "Suburb is required"),
  roleApplyingFor: z.string().min(1, "Role applying for is required"),
  yearsInAustralia: z.string().min(1, "Years of experience is required"),
  currentVenue: z.string().min(1, "Current or most recent venue is required"),
  certifications: z.array(z.string()).min(1, "Select at least one certification"),
  availability: z.string().min(1, "Availability is required"),
  preferredZones: z.array(z.string()).min(1, "Select at least one preferred zone"),
  employmentType: z.array(z.string()).min(1, "Select at least one employment type"),
  briefIntro: z.string().min(1, "Brief intro is required").max(300),
  legalConfirmation: z.literal(true),
  termsAccepted: z.literal(true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.formType === "candidate") {
      const parsedCandidate = candidateSchema.safeParse(body);

      if (!parsedCandidate.success) {
        const errors = parsedCandidate.error.flatten().fieldErrors;
        const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
        return NextResponse.json({ success: false, message: firstError }, { status: 400 });
      }

      const consentTimestamp = new Date().toISOString();

      const candidateRecord: CandidateApplicationRecord = {
        fullName: parsedCandidate.data.fullName,
        email: parsedCandidate.data.email,
        phone: parsedCandidate.data.phone,
        suburb: parsedCandidate.data.suburb,
        roleApplyingFor: parsedCandidate.data.roleApplyingFor,
        yearsInAustralia: parsedCandidate.data.yearsInAustralia,
        currentVenue: parsedCandidate.data.currentVenue,
        certifications: parsedCandidate.data.certifications.join(", "),
        availability: parsedCandidate.data.availability,
        preferredZones: parsedCandidate.data.preferredZones.join(", "),
        employmentType: parsedCandidate.data.employmentType.join(", "),
        briefIntro: parsedCandidate.data.briefIntro,
        legalConfirmation: "Yes",
        termsAccepted: "Yes",
        consentTimestamp,
      };

      const { id } = await createCandidateApplicationRecord(candidateRecord);

      return NextResponse.json({
        success: true,
        message: "Application received successfully",
        recordId: id,
      });
    }

    const parsedVenue = venueSchema.safeParse({
      formType: "venue",
      serviceType: body.serviceType,
      venueName: body.venueName,
      contactPerson: body.contactPerson ?? body.contactName,
      email: body.email,
      phone: body.phone,
      suburb: body.suburb ?? "",
      positionsNeeded: body.positionsNeeded ?? "",
      immediateNeed: body.immediateNeed ?? "",
      additionalNotes: body.additionalNotes ?? body.message ?? "",
      consentAccepted: body.consentAccepted,
    });

    if (!parsedVenue.success) {
      const errors = parsedVenue.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
      return NextResponse.json({ success: false, message: firstError }, { status: 400 });
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
