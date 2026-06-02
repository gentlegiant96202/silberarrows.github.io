import { NextResponse, type NextRequest } from "next/server";

// Password gate for the /ads reporting dashboard.
// The cookie stores sha256(password); we recompute the expected hash from the
// env var and compare. No plaintext password ever touches the cookie.

const COOKIE = "sa_ads";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
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

  const token = req.cookies.get(COOKIE)?.value;
  const expected = await sha256Hex(password);
  if (token && token === expected) {
    return NextResponse.next();
  }

  if (pathname !== "/ads") loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/ads", "/ads/:path*"],
};
