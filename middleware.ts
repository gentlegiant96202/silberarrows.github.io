import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import {
  AD_VISIT_COOKIE,
  AD_VISIT_COOKIE_MAX_AGE,
  buildAdVisitRow,
  isPaidGoogleVisit,
  postAdVisitRow,
} from "@/lib/adVisitLog";

/*
 * Two jobs, split by path:
 *
 *   /ads/**   — password gate for the reporting dashboard (unchanged).
 *   everything else — paid-click visit log. A page request carrying a Google
 *               click id is written to Supabase `ad_visits` from the edge
 *               (IP, UA, geo, ValueTrack keyword) before any JavaScript runs,
 *               and a `_sa_visit` cookie lets the browser attach engagement
 *               data later. The insert runs in `waitUntil`, so it adds no
 *               latency to the page. Requests without a click id pass through
 *               untouched.
 */

/* ── /ads password gate ─────────────────────────────────────────────── */

const ADS_COOKIE = "sa_ads";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function adsGate(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  // The login screen itself must stay reachable.
  if (pathname === "/ads/login" || pathname.startsWith("/ads/login/")) {
    return NextResponse.next();
  }

  const password = process.env.ADS_DASHBOARD_PASSWORD;
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/ads/login";

  if (!password) {
    loginUrl.searchParams.set("setup", "1");
    return NextResponse.redirect(loginUrl);
  }

  const token = req.cookies.get(ADS_COOKIE)?.value;
  const expected = await sha256Hex(password);
  if (token && token === expected) {
    return NextResponse.next();
  }

  if (pathname !== "/ads") loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

/* ── paid-click visit log ───────────────────────────────────────────── */

function logPaidVisit(req: NextRequest, event: NextFetchEvent): NextResponse {
  const res = NextResponse.next();

  if (req.method !== "GET") return res;
  if (!isPaidGoogleVisit(req.nextUrl.searchParams)) return res;

  // Skip React Server Component fetches and link prefetches — only the real
  // document request counts as a visit.
  if (
    req.headers.get("rsc") ||
    req.headers.get("next-router-prefetch") ||
    req.headers.get("purpose") === "prefetch" ||
    req.headers.get("sec-purpose")?.includes("prefetch")
  ) {
    return res;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) return res;

  const visitId = crypto.randomUUID();
  res.cookies.set(AD_VISIT_COOKIE, visitId, {
    path: "/",
    maxAge: AD_VISIT_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: false, // the tracker component reads it
    secure: req.nextUrl.protocol === "https:",
  });

  const row = buildAdVisitRow({ visitId, url: req.nextUrl, headers: req.headers });
  event.waitUntil(postAdVisitRow(row, { supabaseUrl, serviceRoleKey }));

  return res;
}

/* ── entry ──────────────────────────────────────────────────────────── */

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  if (pathname === "/ads" || pathname.startsWith("/ads/")) {
    return adsGate(req);
  }
  return logPaidVisit(req, event);
}

export const config = {
  // Every page route; skip API routes, Next internals and static files
  // (anything with a file extension).
  matcher: ["/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)"],
};
