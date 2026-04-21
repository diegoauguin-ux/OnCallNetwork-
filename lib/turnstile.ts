const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string | undefined
): Promise<{ ok: boolean; message?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Feature flag: if no secret is configured we skip verification. The
    // client-side widget will also be absent, so form still works.
    return { ok: true };
  }
  if (!token) {
    return { ok: false, message: "Please complete the human-check challenge." };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success) return { ok: true };
    return {
      ok: false,
      message: "Human-check failed. Please reload and try again.",
    };
  } catch {
    return { ok: false, message: "Could not verify the human-check. Please try again." };
  }
}
