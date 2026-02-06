import { NextRequest, NextResponse } from "next/server";
import { createVenueRecord, type VenueRecord } from "@/lib/airtable";
import { z } from "zod";

const venueSchema = z.object({
  venueName: z.string().min(1, "Venue name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
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
  immediateNeed: z.string().optional().default("no"),
  additionalNotes: z.string().optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = venueSchema.safeParse({
      venueName: body.venueName,
      contactPerson: body.contactPerson ?? body.contactName,
      email: body.email,
      phone: body.phone,
      suburb: body.suburb ?? body.location ?? "",
      positionsNeeded: body.positionsNeeded ?? "",
      immediateNeed: body.immediateNeed ?? "no",
      additionalNotes: body.additionalNotes ?? body.message ?? "",
    });

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    const record: VenueRecord = {
      venueName: parsed.data.venueName,
      contactPerson: parsed.data.contactPerson,
      email: parsed.data.email,
      phone: parsed.data.phone,
      suburb: parsed.data.suburb || undefined,
      positionsNeeded: parsed.data.positionsNeeded || undefined,
      immediateNeed: parsed.data.immediateNeed || undefined,
      additionalNotes: parsed.data.additionalNotes || undefined,
    };
    const { id } = await createVenueRecord(record);

    return NextResponse.json({
      success: true,
      message: "Request received successfully",
      recordId: id,
    });
  } catch (error) {
    console.error("Venue contact error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to submit request";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

