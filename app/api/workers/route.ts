import { NextRequest, NextResponse } from "next/server";
import { createWorkerRecord } from "@/lib/airtable";
import { z } from "zod";

const workerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  workExperience: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(1, "Minimum 1 year experience required"),
  availability: z.string().min(1, "Availability is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = workerSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    const { id } = await createWorkerRecord(parsed.data);

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      recordId: id,
    });
  } catch (error) {
    console.error("Worker registration error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to register worker";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
