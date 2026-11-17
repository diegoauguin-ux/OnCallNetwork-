import { NextRequest, NextResponse } from "next/server";
import { createWorkerRecord, type WorkerRecord } from "@/lib/airtable";
import { z } from "zod";
import { limit, getClientIp } from "@/lib/rate-limit";

const workerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .regex(
      /^04\d{2}\s?\d{3}\s?\d{3}$/,
      "Phone must be Australian mobile format (04XX XXX XXX)"
    ),
  workExperience: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(1, "Minimum 1 year experience required")
    .max(60),
  role: z.string().trim().min(1, "Role is required").max(120),
  hasRSA: z.string().trim().min(1, "RSA status is required").max(60),
  suburb: z.string().trim().min(1, "Suburb is required").max(120),
  availability: z.string().trim().min(1, "Availability is required").max(300),
  additionalNotes: z.string().trim().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const rl = limit(`workers:${getClientIp(request.headers)}`, { max: 5, windowSeconds: 60 });
    if (!rl.ok) {
      return NextResponse.json({ success: false, message: "Too many requests. Please try again shortly." }, { status: 429 });
    }
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }
    // Honeypot: bots fill hidden fields. Pretend success, store nothing.
    if (typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, string>).website.trim()) {
      return NextResponse.json({ success: true, message: "Registration successful" });
    }

    const parsed = workerSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0]?.[0] ?? "Validation failed";
      return NextResponse.json(
        { success: false, message: firstError },
        { status: 400 }
      );
    }

    const workerData: WorkerRecord = {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      role: parsed.data.role,
      workExperience: parsed.data.workExperience,
      hasRSA: parsed.data.hasRSA,
      suburb: parsed.data.suburb,
      availability: parsed.data.availability,
      additionalNotes: parsed.data.additionalNotes,
    };
    const { id } = await createWorkerRecord(workerData);

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      recordId: id,
    });
  } catch (error) {
    console.error("Worker registration error:", error);
    return NextResponse.json(
      { success: false, message: "We couldn't save your registration just now. Please try again or email hello@oncallnetwork.com.au." },
      { status: 500 }
    );
  }
}
