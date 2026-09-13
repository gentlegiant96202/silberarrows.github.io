import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

/**
 * Engagement ping for a paid-click visit (see components/AdVisitTracker.tsx).
 *
 * The browser beacons its running totals; we hand them to the Postgres
 * function `ad_visit_ping`, which merges with greatest() so out-of-order or
 * duplicate beacons can never shrink a value. Unknown visit ids are a silent
 * no-op — this endpoint can't create rows, only annotate ones the edge
 * middleware already wrote, so it is useless as a spam vector.
 *
 * Always answers 2xx: a tracking failure must never surface to the visitor.
 */

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_ACTIVE_MS = 6 * 60 * 60 * 1000; // 6 h — anything above is a stuck tab / bogus
const MAX_PAGES = 20;

function int(value: unknown, max: number): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.floor(n), max);
}

function bool(value: unknown): boolean {
  return value === true;
}

function pages(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const out: string[] = [];
  for (const p of value) {
    if (typeof p !== "string") continue;
    const v = p.trim().slice(0, 256);
    if (v.startsWith("/")) out.push(v);
    if (out.length >= MAX_PAGES) break;
  }
  return out.length ? out : null;
}

function env(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  // Cap the blob; the tracker sends ~15 small scalars.
  const json = JSON.stringify(value);
  if (json.length > 4000) return null;
  return value as Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    // sendBeacon posts a Blob with type application/json; fetch fallback too.
    body = JSON.parse(await request.text());
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const visitId = typeof body.visitId === "string" ? body.visitId : "";
  if (!UUID_RE.test(visitId)) {
    return new NextResponse(null, { status: 204 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return new NextResponse(null, { status: 204 });
  }

  const { error } = await supabase.rpc("ad_visit_ping", {
    p_visit_id: visitId,
    p_active_ms: int(body.activeMs, MAX_ACTIVE_MS),
    p_max_scroll: int(body.maxScroll, 100),
    p_page_views: int(body.pageViews, 1000),
    p_pages: pages(body.pages),
    p_clicks: int(body.clicks, 10_000),
    p_phone: bool(body.phone),
    p_whatsapp: bool(body.whatsapp),
    p_lead: bool(body.lead),
    p_env: env(body.env),
  });

  if (error) {
    console.error("[ad-visit] ping failed:", error.message);
  }

  return new NextResponse(null, { status: 204 });
}
