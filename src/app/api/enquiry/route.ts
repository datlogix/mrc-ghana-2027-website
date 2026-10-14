import { NextResponse } from "next/server";
import { enquirySchema, deliverEnquiry, verifyTurnstile, MIN_FILL_MS } from "@/lib/enquiry";

export const runtime = "nodejs";

// Best-effort in-memory rate limit (per server instance). Pair with Turnstile for stronger protection.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "Invalid request origin." }, { status: 403 });
  }

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    // Honeypot filled → pretend success so bots learn nothing.
    if (fieldErrors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }

  const data = parsed.data;
  if (Date.now() - data.startedAt < MIN_FILL_MS) return NextResponse.json({ ok: true }); // too fast: likely a bot

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "Spam check failed. Please try again." }, { status: 400 });
  }

  try {
    const result = await deliverEnquiry(data);
    if (result === "not-configured") {
      return NextResponse.json(
        { ok: false, error: "Online enquiries are temporarily unavailable. Please email us directly.", fallback: true },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] delivery failed", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { ok: false, error: "We could not send your enquiry right now. Please email us directly.", fallback: true },
      { status: 502 },
    );
  }
}
