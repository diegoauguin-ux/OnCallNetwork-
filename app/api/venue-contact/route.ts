import { NextRequest, NextResponse } from "next/server";
import { createVenueRecord } from "@/lib/airtable";
import { z } from "zod";

const venueSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  venueType: z.string().min(1, "Venue type is required"),
  location: z.string().optional().default(""),
  immediateNeed: z.string().optional().default("no"),
  message: z.string().optional().default(""),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = venueSchema.safeParse({
      businessName: body.businessName ?? body.venueName,
      contactPerson: body.contactPerson ?? body.contactName,
      email: body.email,
      phone: body.phone,
      venueType: body.venueType,
      location: body.location ?? "",
      immediateNeed: body.immediateNeed ?? "no",
      message: body.message ?? "",
    });

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    const { id } = await createVenueRecord(parsed.data);

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
