import type { Metadata } from "next";
import { checkPaidSession } from "@/lib/stripe-check";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CV order details",
  robots: { index: false, follow: false },
};

const TALLY_FORM_ID = process.env.TALLY_CV_FORM_ID || "6DDe4O";

export default async function CvGraciasPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
  const result = await checkPaidSession(sessionId);

  if (!result.paid || !sessionId) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#14342B]">We couldn&apos;t find your payment</h1>
        <p className="mt-3 text-gray-600">
          This page opens after a successful payment. If you already paid, wait a minute and
          refresh, or email{" "}
          <a className="underline" href="mailto:hello@oncallnetwork.com.au">
            hello@oncallnetwork.com.au
          </a>{" "}
          with the email you paid with and we&apos;ll sort it out.
        </p>
      </main>
    );
  }

  const params = new URLSearchParams({
    hideTitle: "1",
    transparentBackground: "1",
    dynamicHeight: "1",
    session_id: sessionId,
  });
  if (result.email) params.set("email", result.email);
  if (result.name) params.set("full_name", result.name);

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-center text-2xl font-bold text-[#14342B]">
        Payment received. One last step.
      </h1>
      <p className="mx-auto mt-2 max-w-lg text-center text-gray-600">
        Fill in your details and upload your current CV. Your rewritten CV, cover letter and
        checklist will arrive by email within 24 hours.
      </p>
      <iframe
        src={`https://tally.so/embed/${TALLY_FORM_ID}?${params.toString()}`}
        title="CV order details"
        className="mt-6 w-full"
        style={{ border: 0, minHeight: 900 }}
        loading="lazy"
      />
      <script async src="https://tally.so/widgets/embed.js" />
    </main>
  );
}
