"use client";

import { useEffect, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { site } from "@/lib/site";

const OPENED_KEY = "sa-workshop-pin-opened";

/**
 * Opens the Google Maps business pin. The first visit (the notification
 * tap) navigates straight into Maps. Coming back leaves this page in
 * place so the pin can be opened again.
 */
export function GoogleMapsLaunch() {
  const pinUrl = site.googleMaps.profile;
  const [phase, setPhase] = useState<"opening" | "ready">("opening");

  useEffect(() => {
    let openedAlready = false;
    try {
      openedAlready = sessionStorage.getItem(OPENED_KEY) === "1";
    } catch {
      openedAlready = false;
    }
    if (openedAlready) {
      setPhase("ready");
      return;
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(OPENED_KEY, "1");
      } catch {
        /* private mode */
      }
      window.location.assign(pinUrl);
    }, 900);
    return () => window.clearTimeout(timer);
  }, [pinUrl]);

  return (
    <section className="fixed inset-0 z-50 overflow-hidden bg-ink-950 text-cream">
      <img
        src="/assets/images/hero-bg-silver-optimized.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/35" />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(229,228,226,0.18), transparent 68%)",
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-end px-6 pb-16 pt-24 text-center sm:justify-center sm:pb-0">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-silver-300">
          SilberArrows · Al Quoz
        </p>
        <h1 className="text-display mt-4 max-w-xl text-5xl text-cream sm:text-6xl">
          Workshop pin
        </h1>
        <p className="mt-4 max-w-md text-base text-silver-200">
          {site.address.line1}, {site.address.line2}
        </p>

        <a
          href={pinUrl}
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cream px-6 text-sm font-semibold text-ink-950"
        >
          <Navigation size={16} strokeWidth={2.25} aria-hidden />
          Open in Google Maps
        </a>

        <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-silver-300">
          <MapPin size={13} aria-hidden />
          {phase === "opening" ? "Opening the pin…" : "Tap above if the pin didn’t open"}
        </p>
        <p className="mt-6 text-[0.6875rem] uppercase tracking-[0.18em] text-silver-400">
          {site.hours}
        </p>
      </div>
    </section>
  );
}
