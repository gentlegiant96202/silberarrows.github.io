"use client";

import {
  Star,
  ShieldCheck,
  Truck,
  Award,
  BadgePercent,
  MapPin,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { useContactModal } from "@/components/ContactModalProvider";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { heroAr, siteAr } from "@/lib/content-ar";

/**
 * Arabic hero — same structure and visual language as `sections/Hero.tsx`,
 * laid out for RTL. Copy comes from `lib/content-ar.ts`; every claim mirrors
 * the English service LP and the live Arabic RSA.
 */
export function HeroAr() {
  const { openModal } = useContactModal();

  return (
    <section className="relative isolate overflow-clip">
      {/* ── Full-bleed cinematic backdrop ─────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <HeroCarousel images={heroAr.carousel} sizes="100vw" kenBurns />
        <div className="hero-scrim pointer-events-none absolute inset-0" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-ink-950)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[color:var(--color-ink-950)]" />
      </div>

      <div className="container-page relative z-10 flex flex-col pt-8 pb-12 md:pt-12 md:pb-14 lg:min-h-[min(calc(100svh-7rem),54rem)]">
        <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ── Copy (reading side in RTL) ───────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="anim-fade silver-chip inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 backdrop-blur-md">
              <span className="silver-dot inline-flex h-2 w-2 rounded-full" />
              <span className="text-[11px] font-semibold text-silver-shine">
                {heroAr.eyebrow}
              </span>
            </div>

            <h1 className="anim-rise text-display mt-6 font-bold">
              {heroAr.titleParts.map((p, i) => (
                <span
                  key={i}
                  className="block text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] lg:text-[3.75rem] xl:text-[4.25rem] 2xl:text-[4.75rem]"
                  style={
                    { animationDelay: `${0.05 * i}s` } as React.CSSProperties
                  }
                >
                  {p.highlight ? (
                    <span className="text-silver-shine">{p.line}</span>
                  ) : (
                    <span className="text-white/95">{p.line}</span>
                  )}
                </span>
              ))}
            </h1>

            {/* Offer hook — primary conversion driver */}
            <div className="anim-rise mt-6">
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 backdrop-blur-md">
                <BadgePercent
                  size={18}
                  className="shrink-0 text-emerald-300"
                />
                <p className="text-sm font-semibold text-white sm:text-[15px]">
                  <span className="text-emerald-300">{heroAr.offerStrong}</span>{" "}
                  {heroAr.offerRest}
                </p>
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[color:var(--color-silver-500)]">
                <span className="inline-flex items-center gap-1 font-medium text-[color:var(--color-silver-300)]">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  {heroAr.offerUrgency}
                </span>
                <span aria-hidden>·</span>
                <span>{heroAr.offerTerms}</span>
              </p>
            </div>

            <div className="anim-rise mt-6 flex max-w-xl flex-col gap-2 text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg">
              {heroAr.subtitle.map((sentence, i) => (
                <p key={i} className="m-0">
                  {sentence}
                </p>
              ))}
            </div>

            <div className="anim-rise mt-6 flex flex-wrap gap-2.5">
              {siteAr.badges.map((b, i) => (
                <span
                  key={i}
                  className="silver-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs backdrop-blur-md"
                >
                  {i === 0 ? (
                    <ShieldCheck
                      size={12}
                      className="text-[color:var(--color-platinum)]"
                    />
                  ) : (
                    <Truck
                      size={12}
                      className="text-[color:var(--color-platinum)]"
                    />
                  )}
                  {b}
                </span>
              ))}
            </div>

            {/* Primary CTA + proof — WhatsApp lives in the sticky footer */}
            <div className="anim-rise mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                onClick={openModal}
                className="btn-silver group inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold sm:w-auto"
              >
                <span className="whitespace-nowrap">{heroAr.cta}</span>
                {/* Forward arrow points left in RTL */}
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </button>
              <a
                href="#reviews"
                className="group inline-flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10 sm:justify-start"
              >
                <span className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[color:var(--color-platinum)] text-[color:var(--color-platinum)]"
                    />
                  ))}
                </span>
                <span className="text-start leading-tight">
                  <span className="block text-sm font-semibold text-white">
                    {siteAr.reviews.rating}{" "}
                    <span className="font-normal text-[color:var(--color-silver-500)]">
                      / 5
                    </span>
                  </span>
                  <span className="block text-[10px] text-[color:var(--color-silver-400)]">
                    {siteAr.reviews.count} {heroAr.reviewsLabel}
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* ── Establishment + location plates ──────────────────────── */}
          <div className="anim-fade flex flex-col justify-between gap-6 lg:col-span-5 lg:items-end">
            <div className="flex w-full items-center justify-between gap-3 lg:justify-end">
              <span className="silver-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                <Award
                  size={11}
                  className="text-[color:var(--color-platinum)]"
                />
                {heroAr.est}
              </span>

              <div className="surface hidden rounded-xl px-4 py-3 backdrop-blur-xl lg:block">
                <p className="text-2xl font-semibold leading-none text-silver-shine">
                  <span dir="ltr">{siteAr.stats[0].value}</span>
                </p>
                <p className="mt-1 text-[10px] text-[color:var(--color-silver-300)]">
                  {siteAr.stats[0].label}
                </p>
              </div>
            </div>

            <div className="surface relative w-full overflow-hidden rounded-2xl p-5 backdrop-blur-xl md:p-6 lg:max-w-sm">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
              <div className="flex items-center gap-3">
                <span className="silver-bar" />
                <p className="text-[11px] font-semibold text-silver-shine">
                  {heroAr.plateEyebrow}
                </p>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <p className="text-sm text-white md:text-base">
                  {heroAr.plateAddress}
                </p>
              </div>
              <div className="mt-2.5 flex items-start gap-3">
                <Clock
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <p className="text-xs text-[color:var(--color-silver-400)] md:text-sm">
                  {siteAr.hours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quantified trust — hairline stats bar ────────────────────── */}
        <div className="anim-rise mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 md:mt-14 md:gap-8 md:pt-8">
          {siteAr.stats.map((s, i) => (
            <div key={i} className="min-w-0">
              <p className="text-[1.35rem] font-semibold leading-none text-silver-shine sm:text-3xl md:text-4xl lg:text-5xl">
                {/* Isolate so "15+" keeps its Latin order inside RTL text */}
                <span dir="ltr">{s.value}</span>
              </p>
              <p className="mt-2 text-[11px] text-[color:var(--color-silver-400)] sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
