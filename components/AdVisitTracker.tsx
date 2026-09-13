"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Engagement half of the paid-click visit log.
 *
 * Mounted once in the root layout. Does nothing unless the edge middleware
 * set a `_sa_visit` cookie (i.e. this session started from a Google Ads
 * click). While the cookie exists it measures:
 *
 *   - active time  — only while the tab is visible
 *   - max scroll   — deepest point reached, as % of the page
 *   - page views   — client-side navigations, with the path list
 *   - clicks       — any pointer click on the page
 *   - contact      — Call / WhatsApp taps, form lead (thank-you page)
 *   - environment  — viewport, language, timezone, touch, webdriver, cores…
 *
 * and beacons the running totals to /api/ad-visit at 10 s, then every 30 s
 * while visible, and whenever the tab is hidden or unloaded. The server merges
 * with greatest(), so beacon order does not matter and nothing is lost if one
 * is dropped. A visit that never pings at all is a client that never ran
 * JavaScript — that absence is itself one of the fraud signals.
 */

const COOKIE = "_sa_visit";
const ENDPOINT = "/api/ad-visit";
const FIRST_PING_MS = 10_000;
const HEARTBEAT_MS = 30_000;
const MAX_PAGES = 20;
const MAX_HEARTBEATS = 40; // ≈ 20 min of visible time

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function scrollPct(): number {
  const doc = document.documentElement;
  const total = Math.max(doc.scrollHeight, document.body?.scrollHeight ?? 0) - window.innerHeight;
  if (total <= 0) return 100;
  return Math.min(100, Math.round(((window.scrollY || doc.scrollTop) / total) * 100));
}

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { effectiveType?: string };
};

function environment(): Record<string, unknown> {
  const nav = navigator as NavigatorExtras;
  let tz: string | null = null;
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    /* ignore */
  }
  return {
    vw: window.innerWidth,
    vh: window.innerHeight,
    sw: window.screen?.width ?? null,
    sh: window.screen?.height ?? null,
    dpr: window.devicePixelRatio ?? null,
    lang: navigator.language ?? null,
    langs: Array.isArray(navigator.languages) ? navigator.languages.slice(0, 4) : null,
    tz,
    tzOffset: new Date().getTimezoneOffset(),
    touch: "ontouchstart" in window || (navigator.maxTouchPoints ?? 0) > 0,
    webdriver: navigator.webdriver === true,
    cores: navigator.hardwareConcurrency ?? null,
    memory: nav.deviceMemory ?? null,
    connection: nav.connection?.effectiveType ?? null,
    cookies: navigator.cookieEnabled,
    referrer: document.referrer || null,
  };
}

export function AdVisitTracker() {
  const pathname = usePathname();

  // Mutable session state — survives client navigations because this
  // component lives in the root layout and never remounts.
  const state = useRef({
    visitId: null as string | null,
    activeMs: 0,
    visibleSince: null as number | null,
    maxScroll: 0,
    pages: [] as string[],
    clicks: 0,
    phone: false,
    whatsapp: false,
    lead: false,
    heartbeats: 0,
    env: null as Record<string, unknown> | null,
  });

  // Page views: record each distinct path as the router changes it.
  useEffect(() => {
    const s = state.current;
    if (!pathname) return;
    if (s.pages[s.pages.length - 1] !== pathname && s.pages.length < MAX_PAGES) {
      s.pages.push(pathname);
    }
    if (pathname.startsWith("/thank-you")) s.lead = true;
    // A new page starts at the top; keep the deepest value already seen.
    s.maxScroll = Math.max(s.maxScroll, scrollPct());
  }, [pathname]);

  useEffect(() => {
    const visitId = readCookie(COOKIE);
    if (!visitId) return;
    const s = state.current;
    s.visitId = visitId;
    s.env = environment();
    if (document.visibilityState === "visible") s.visibleSince = performance.now();

    const settle = () => {
      if (s.visibleSince !== null) {
        s.activeMs += performance.now() - s.visibleSince;
        s.visibleSince = document.visibilityState === "visible" ? performance.now() : null;
      } else if (document.visibilityState === "visible") {
        s.visibleSince = performance.now();
      }
    };

    const send = () => {
      settle();
      const body = JSON.stringify({
        visitId: s.visitId,
        activeMs: Math.round(s.activeMs),
        maxScroll: s.maxScroll,
        pageViews: s.pages.length,
        pages: s.pages,
        clicks: s.clicks,
        phone: s.phone,
        whatsapp: s.whatsapp,
        lead: s.lead,
        env: s.env,
      });
      try {
        if (navigator.sendBeacon) {
          // A Blob keeps the request a simple POST (no CORS preflight) while
          // letting the route parse it as JSON.
          navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
          return;
        }
      } catch {
        /* fall through to fetch */
      }
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    };

    const onScroll = () => {
      const pct = scrollPct();
      if (pct > s.maxScroll) s.maxScroll = pct;
    };

    const onClick = (e: MouseEvent) => {
      s.clicks += 1;
      const target = e.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (/^tel:/i.test(href)) s.phone = true;
      else if (/wa\.me|whatsapp/i.test(href)) s.whatsapp = true;
      // Contact taps navigate away immediately on mobile — flush now.
      if (s.phone || s.whatsapp) send();
    };

    const onVisibility = () => {
      settle();
      if (document.visibilityState === "hidden") send();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", send);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, { capture: true, passive: true });

    const first = window.setTimeout(send, FIRST_PING_MS);
    const beat = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (s.heartbeats >= MAX_HEARTBEATS) return;
      s.heartbeats += 1;
      send();
    }, HEARTBEAT_MS);

    return () => {
      window.clearTimeout(first);
      window.clearInterval(beat);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", send);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
    };
    // Mount once; navigations are handled by the pathname effect above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
