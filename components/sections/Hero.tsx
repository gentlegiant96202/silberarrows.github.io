import { Star, ShieldCheck, Truck, Award } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { HeroCarousel, type HeroCarouselImage } from "@/components/sections/HeroCarousel";
import { site } from "@/lib/site";

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
    <section className="relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="pointer-events-none absolute -top-32 left-0 h-[600px] w-[800px] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,212,216,0.18), transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-0 h-[500px] w-[800px] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(174,174,179,0.14), transparent 60%)",
        }}
      />

      <div className="container-page relative z-10 pt-10 pb-20 md:pt-16 md:pb-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute inset-0 hero-geo-depth opacity-90 md:opacity-100" />
          <div className="absolute inset-0 hero-rim-glow" />
        </div>

        <div className="relative grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* LEFT — copy; lg pt/pb matches frame insets (top-5 / bottom-5) */}
          <div className="relative flex min-h-0 flex-col lg:h-full lg:pt-5 lg:pb-5">
            <div>
              <div className="anim-fade silver-chip inline-flex items-center gap-2 rounded-full px-3 py-1 backdrop-blur-md">
                <span className="silver-dot inline-flex h-2 w-2 rounded-full" />
                <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-silver-shine">
                  {tagline}
                </span>
              </div>

              <h1 className="anim-rise mt-6 font-semibold uppercase tracking-[-0.02em]">
                {titleParts.map((p, i) => (
                  <span
                    key={i}
                    className="block text-[2.25rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.75rem] xl:text-[4rem] leading-[0.85] whitespace-nowrap"
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

              <div className="anim-rise mt-5 flex max-w-xl flex-col gap-2 text-base leading-snug text-[color:var(--color-silver-300)] md:gap-2 md:text-lg md:leading-snug">
                {subtitleParagraphs(subtitle).map((sentence, i) => (
                  <p key={i} className="m-0 leading-snug">
                    {sentence}
                  </p>
                ))}
              </div>
            </div>

            {/* BOTTOM GROUP — lg:pb-5 on parent + mt-auto lines up with glass card (bottom-5) */}
            <div className="mt-8 lg:mt-auto">
              <div className="anim-rise flex flex-wrap gap-2.5">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="silver-chip inline-flex items-center gap-2 rounded-full backdrop-blur-md px-4 py-1.5 text-xs"
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

              <div className="anim-rise mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                <CTAButton label="Get a Free Quote" size="lg" />
                <a
                  href={site.reviews.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 transition hover:opacity-90"
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
                      <span className="text-[color:var(--color-silver-500)] font-normal">
                        / 5
                      </span>
                    </span>
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-silver-400)]">
                      {site.reviews.count} Google Reviews
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — framed visual */}
          <div className="relative anim-fade">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-square overflow-hidden rounded-3xl ring-chrome">
              {/* chrome top hairline */}
              <div className="pointer-events-none absolute inset-x-6 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />

              {/* Auto-rotating exterior-to-interior carousel */}
              <HeroCarousel images={heroCarouselImages} />

              {/* Gradient overlays for depth */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

              {/* Top-left badge: established */}
              <div className="pointer-events-none silver-chip absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                <Award
                  size={11}
                  className="text-[color:var(--color-platinum)]"
                />
                Est. {site.established}
              </div>

              {/* Bottom info plate */}
              <div className="pointer-events-none absolute inset-x-5 bottom-5 z-10">
                <div className="relative overflow-hidden rounded-2xl glass-card ring-silver p-5 backdrop-blur-xl">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
                  <div className="flex items-center gap-3">
                    <span className="silver-bar" />
                    <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-silver-shine">
                      Dubai Service Centre
                    </p>
                  </div>
                  <p className="mt-2 text-sm md:text-base text-white">
                    Al Manara Street, Al Quoz
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--color-silver-400)]">
                    {site.hours}
                  </p>
                </div>
              </div>

              {/* Floating stat plate top-right */}
              <div className="pointer-events-none hidden md:block absolute right-5 top-5 z-10">
                <div className="relative overflow-hidden rounded-xl glass-card ring-chrome px-4 py-3 backdrop-blur-xl">
                  <p className="text-2xl font-semibold text-silver-shine leading-none">
                    {site.stats[0].value}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-silver-300)]">
                    {site.stats[0].label}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative outer glow */}
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(229,228,226,0.18), transparent 65%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--color-ink-950)]" />
    </section>
  );
}
