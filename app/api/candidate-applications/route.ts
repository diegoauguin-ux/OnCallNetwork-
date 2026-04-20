import { NextRequest, NextResponse } from "next/server";
import {
  createCandidateApplicationRecord,
  type CandidateApplicationRecord,
} from "@/lib/airtable";
import { z } from "zod";

const candidateSchema = z.object({
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
  certifications: z.array(z.string()).min(1),
  availability: z.string().min(1, "Availability is required"),
  preferredZones: z.array(z.string()).min(1),
  employmentType: z.array(z.string()).min(1),
  briefIntro: z.string().min(1).max(300),
  legalConfirmation: z.literal(true),
  termsAccepted: z.literal(true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = candidateSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
      return NextResponse.json({ success: false, message: firstError }, { status: 400 });
    }

    const record: CandidateApplicationRecord = {
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
      legalConfirmation: "Yes",
      termsAccepted: "Yes",
    };

    const { id } = await createCandidateApplicationRecord(record);

    return NextResponse.json({
      success: true,
      message: "Application received successfully",
      recordId: id,
    });
  } catch (error) {
    console.error("Candidate application error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to submit application";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
