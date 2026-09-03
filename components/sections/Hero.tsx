import {
  Star,
  ShieldCheck,
  Truck,
  Award,
  BadgePercent,
  MapPin,
  Clock,
} from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import {
  HeroCarousel,
  type HeroCarouselImage,
} from "@/components/sections/HeroCarousel";
import { site } from "@/lib/site";
import { preserveBrandWrap } from "@/lib/utils";

const heroCarouselImages: HeroCarouselImage[] = [
  {
    src: "/assets/images/hero-bg-silver-optimized.avif",
    alt: "Mercedes-Benz at SilberArrows Service Centre.",
  },
  {
    src: "/assets/images/hero/01-exterior.jpg",
    alt: "Exterior of the SilberArrows Mercedes-Benz service centre in Al Quoz, Dubai, with G-Class models parked outside.",
  },
  {
    src: "/assets/images/hero/02-lounge.jpg",
    alt: "SilberArrows customer lounge and service reception with seating and advisor desks.",
  },
  {
    src: "/assets/images/hero/03-workshop.jpg",
    alt: "Inside the SilberArrows Mercedes-Benz workshop with multiple cars on scissor lifts.",
  },
  {
    src: "/assets/images/hero/05-mechanic-underbody.jpg",
    alt: "SilberArrows technician inspecting the underbody of a Mercedes-Benz with a torch.",
  },
  {
    src: "/assets/images/hero/06-mechanic-engine.jpg",
    alt: "SilberArrows technician working on a Mercedes-Benz engine bay.",
  },
];

type HeroProps = {
  tagline?: string;
  titleParts?: { line: string; highlight?: boolean }[];
  subtitle?: string;
  badges?: string[];
};

const defaultTitle = [
  { line: "Independent" },
  { line: "Mercedes-Benz", highlight: true },
  { line: "Service Centre" },
  { line: "in Dubai" },
];

const defaultSubtitle =
  "Exclusively servicing Mercedes-Benz only. Our trusted name ensures a service record from us retains your vehicle's value.";

function subtitleParagraphs(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=\.)\s+/)
    .filter(Boolean);
}

export function Hero({
  tagline = site.tagline,
  titleParts = defaultTitle,
  subtitle = defaultSubtitle,
  badges = site.badges,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-clip">
      {/* ── Full-bleed cinematic backdrop ─────────────────────────────── */}
      <div className="absolute inset-0 -z-10">
        <HeroCarousel images={heroCarouselImages} sizes="100vw" kenBurns />
        <div className="hero-scrim pointer-events-none absolute inset-0" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        {/* Blend out of the (black) header and into the next section */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-ink-950)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[color:var(--color-ink-950)]" />
      </div>

      <div className="container-page relative z-10 flex flex-col pt-8 pb-12 md:pt-12 md:pb-14 lg:min-h-[min(calc(100svh-7rem),54rem)]">
        <div className="grid flex-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ── LEFT — copy ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="anim-fade silver-chip inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 backdrop-blur-md">
              <span className="silver-dot inline-flex h-2 w-2 rounded-full" />
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-silver-shine">
                {tagline}
              </span>
            </div>

            <h1 className="anim-rise text-display mt-6 font-display font-bold lg:font-semibold">
              {titleParts.map((p, i) => (
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
                <p className="text-sm font-semibold text-white sm:text-[0.9375rem]">
                  <span className="text-emerald-300">20% OFF</span> your first
                  Minor or Major Service
                </p>
              </div>
              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] text-[color:var(--color-silver-500)]">
                <span className="inline-flex items-center gap-1 font-medium text-[color:var(--color-silver-300)]">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                  Limited slots this month
                </span>
                <span aria-hidden>·</span>
                <span>New customers only. T&amp;Cs apply.</span>
              </p>
            </div>

            <div className="anim-rise mt-6 flex max-w-xl flex-col gap-2 text-base leading-snug text-[color:var(--color-silver-300)] md:text-lg">
              {subtitleParagraphs(subtitle).map((sentence, i) => (
                <p key={i} className="m-0 leading-snug">
                  {preserveBrandWrap(sentence)}
                </p>
              ))}
            </div>

            <div className="anim-rise mt-6 flex flex-wrap gap-2.5">
              {badges.map((b, i) => (
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
              <CTAButton
                label="Get a Free Quote"
                size="lg"
                className="w-full sm:w-auto"
              />
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
                <span className="text-left leading-tight">
                  <span className="block text-sm font-semibold text-white">
                    {site.reviews.rating}{" "}
                    <span className="font-normal text-[color:var(--color-silver-500)]">
                      / 5
                    </span>
                  </span>
                  <span className="block text-[0.625rem] uppercase tracking-[0.16em] text-[color:var(--color-silver-400)]">
                    {site.reviews.count} Google Reviews
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* ── RIGHT — establishment + location plates ──────────────── */}
          <div className="anim-fade flex flex-col justify-between gap-6 lg:col-span-5 lg:items-end">
            <div className="flex w-full items-center justify-between gap-3 lg:justify-end">
              <span className="silver-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                <Award
                  size={11}
                  className="text-[color:var(--color-platinum)]"
                />
                Est. {site.established}
              </span>

              {/* Desktop-only headline stat; the stats bar below carries it on mobile */}
              <div className="surface hidden rounded-xl px-4 py-3 backdrop-blur-xl lg:block">
                <p className="text-2xl font-semibold leading-none text-silver-shine">
                  {site.stats[0].value}
                </p>
                <p className="mt-1 text-[0.5625rem] uppercase tracking-[0.2em] text-[color:var(--color-silver-300)]">
                  {site.stats[0].label}
                </p>
              </div>
            </div>

            <div className="surface relative w-full overflow-hidden rounded-2xl p-5 backdrop-blur-xl md:p-6 lg:max-w-sm">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
              <div className="flex items-center gap-3">
                <span className="silver-bar" />
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-silver-shine">
                  Dubai Service Centre
                </p>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <p className="text-sm text-white md:text-base">
                  Al Manara Street, Al Quoz
                </p>
              </div>
              <div className="mt-2.5 flex items-start gap-3">
                <Clock
                  size={16}
                  className="mt-0.5 shrink-0 text-[color:var(--color-silver-300)]"
                />
                <p className="text-xs text-[color:var(--color-silver-400)] md:text-sm">
                  {site.hours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quantified trust — hairline stats bar ────────────────────── */}
        <div className="anim-rise mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 md:mt-14 md:gap-8 md:pt-8">
          {site.stats.map((s, i) => (
            <div key={i} className="min-w-0">
              <p className="text-[1.35rem] font-semibold leading-none tracking-tight text-silver-shine sm:text-3xl md:text-4xl lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] sm:text-[0.6875rem] md:tracking-[0.22em]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
