// Minimal Stripe lookup (no SDK): confirms a Checkout Session was really paid.
// Requires STRIPE_SECRET_KEY (use a restricted key with read access to
// "Checkout Sessions"). Optionally pin to one Payment Link with
// STRIPE_CV_PAYMENT_LINK_ID so other products can't unlock the form.

export type PaidSession = {
  paid: boolean;
  email?: string;
  name?: string;
};

export async function checkPaidSession(sessionId: string | undefined): Promise<PaidSession> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !sessionId || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) {
    return { paid: false };
  }
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" }
    );
    if (!res.ok) return { paid: false };
    const s = (await res.json()) as {
      payment_status?: string;
      payment_link?: string | null;
      customer_details?: { email?: string; name?: string } | null;
    };
    const pinned = process.env.STRIPE_CV_PAYMENT_LINK_ID;
    if (pinned && s.payment_link !== pinned) return { paid: false };
    return {
      paid: s.payment_status === "paid",
      email: s.customer_details?.email ?? undefined,
      name: s.customer_details?.name ?? undefined,
    };
  } catch (error) {
    console.error("[stripe-check] lookup failed", error);
    return { paid: false };
  }
}
