import { NextResponse } from "next/server";
import crypto from "crypto";

const COOKIE = "sa_ads";

function redirect(req: Request, path: string) {
  return NextResponse.redirect(new URL(path, req.url), { status: 303 });
}

export async function POST(req: Request) {
  const form = await req.formData();
  const action = String(form.get("action") || "login");

  if (action === "logout") {
    const res = redirect(req, "/ads/login");
    res.cookies.set(COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  }

  const password = String(form.get("password") || "");
  const next = String(form.get("next") || "/ads");
  const expected = process.env.ADS_DASHBOARD_PASSWORD;

  if (!expected || password !== expected) {
    const url = new URL("/ads/login", req.url);
    url.searchParams.set("error", "1");
    if (next && next !== "/ads") url.searchParams.set("next", next);
    return NextResponse.redirect(url, { status: 303 });
  }

  const token = crypto.createHash("sha256").update(expected).digest("hex");
  const dest = next.startsWith("/ads") && !next.startsWith("/ads/login") ? next : "/ads";
  const res = redirect(req, dest);
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
