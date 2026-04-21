type Bucket = { count: number; resetAt: number };

// In-memory limiter. Works per-process. Good enough for low-to-moderate MVP
// traffic on a single-region Vercel deployment; for production-grade limiting
// swap to Upstash Ratelimit or Redis by keeping this API surface identical.
const buckets: Map<string, Bucket> = (globalThis as unknown as { __ocn_rl?: Map<string, Bucket> })
  .__ocn_rl ?? new Map<string, Bucket>();

(globalThis as unknown as { __ocn_rl?: Map<string, Bucket> }).__ocn_rl = buckets;

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function limit(
  key: string,
  opts: { max: number; windowSeconds: number }
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  const windowMs = opts.windowSeconds * 1000;

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: opts.max - 1, retryAfterSeconds: opts.windowSeconds };
  }

  if (existing.count >= opts.max) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: opts.max - existing.count,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") || "unknown";
}
