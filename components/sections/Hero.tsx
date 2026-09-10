import { Fragment } from "react";
import { BadgePercent } from "lucide-react";
import {
  BrakeDiscIcon,
  CarIcon,
  CertificateIcon,
  DiagnosticsIcon,
  LaurelIcon,
  MedalIcon,
  RecoveryTruckIcon,
  ShieldCheckIcon,
} from "@/components/icons/TrustIcons";
import {
  HeroCarousel,
  type HeroCarouselImage,
} from "@/components/sections/HeroCarousel";
import { HeroActions } from "@/components/sections/HeroActions";
import {
  HeroTrustStrip,
  splitTwoLines,
  type HeroTrustItem,
} from "@/components/sections/HeroTrustStrip";
import { site } from "@/lib/site";
import type { HeroTitleLine } from "@/lib/content";
import { cn, preserveBrandWrap } from "@/lib/utils";

// Single still with a slow, continuous zoom (see `.hero-photo` in globals.css).
const heroCarouselImages: HeroCarouselImage[] = [
  {
    src: "/assets/images/hero/02-lounge.jpg",
    alt: "SilberArrows customer lounge and service reception with seating and advisor desks.",
  },
];

type HeroProps = {
  /** Optional eyebrow above the headline. Homepage renders none; landing
   *  pages pass their keyword line. */
  tagline?: string;
  titleParts?: HeroTitleLine[];
  subtitle?: string;
  badges?: string[];
};

// Two balanced lines (25 / 23 chars). The font size is fitted to the copy
// column at every breakpoint (see `headlineFit`), so it stays two lines on
// every phone width rather than wrapping into a four-line stack.
const defaultTitle: HeroTitleLine[] = [
  [{ text: "Independent" }, { text: "Mercedes-Benz", highlight: true }],
  [{ text: "Service Centre in Dubai" }],
];

const defaultSubtitle =
  "Exclusively servicing Mercedes-Benz only. Our trusted name ensures a service record from us retains your vehicle's value.";

/**
 * Corporate A Regular averages ~0.47em per character (measured from the
 * font's advance widths). 3% headroom absorbs kerning/tracking variance.
 */
const HEADLINE_EM_PER_CHAR = 0.47;
const HEADLINE_FIT_HEADROOM = 1.03;

function lineText(line: HeroTitleLine): string {
  return line.map((s) => s.text).join(" ");
}

/**
 * Font size at which the longest headline line exactly fills the copy block
 * (`100cqi` = the block's inline size; the block is a CSS container). Used
 * as the upper bound of `min(<breakpoint size>, fit)` so the headline never
 * wraps mid-line from `sm` up, while short titles keep the full breakpoint size.
 */
function headlineFit(lines: HeroTitleLine[]): string {
  const longest = Math.max(1, ...lines.map((l) => lineText(l).length));
  const em = longest * HEADLINE_EM_PER_CHAR * HEADLINE_FIT_HEADROOM;
  return `calc(100cqi / ${em.toFixed(2)})`;
}

/**
 * "15+" + "Years Experience" → ["**15+** Years", "Experience"]: the bold
 * value shares the first line with the label's first word.
 */
function statLines(value: string, label: string): HeroTrustItem["lines"] {
  const [first, ...rest] = label.trim().split(/\s+/);
  return [
    <>
      <b className="font-bold text-cream">{value}</b> {first}
    </>,
    rest.join(" "),
  ];
}

/**
 * Trust points along the hero's base. Six fixed items plus the page's
 * badges (2 on the homepage, up to 3 on landing pages) fill the row.
 */
function trustItems(badges: string[]): HeroTrustItem[] {
  const badgeIcons = [ShieldCheckIcon, RecoveryTruckIcon, CertificateIcon] as const;
  const [years, vehicles] = site.stats;
  return [
    { icon: LaurelIcon, lines: ["Established", String(site.established)] },
    { icon: MedalIcon, lines: statLines(years.value, years.label) },
    { icon: CarIcon, lines: statLines(vehicles.value, vehicles.label) },
    { icon: BrakeDiscIcon, lines: ["Mercedes-Benz", "Genuine Parts"] },
    { icon: DiagnosticsIcon, lines: ["XENTRY", "Diagnostics"] },
    { icon: CertificateIcon, lines: ["Factory-Trained", "Technicians"] },
    ...badges.map((b, i) => ({
      icon: badgeIcons[i % badgeIcons.length],
      lines: splitTwoLines(b),
    })),
  ];
}

export function Hero({
  tagline,
  titleParts = defaultTitle,
  subtitle = defaultSubtitle,
  badges = site.badges,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-clip">
      {/* ── Full-bleed backdrop ──────────────────────────────────────────
          Photo is toned down at source (`.hero-photo`: brightness/saturation
          filter) and then covered by a directional scrim that is darkest
          where the copy sits — bottom on phones, left on desktop — so the
          text passes contrast while the room stays visible elsewhere. */}
      <div className="absolute inset-0 -z-10">
        <HeroCarousel
          images={heroCarouselImages}
          sizes="100vw"
          kenBurns
          className="hero-photo"
        />
        <div className="hero-scrim-copy pointer-events-none absolute inset-0" />
        {/* Blend out of the (black) sticky header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-ink-950)] to-transparent" />
        {/* Ground the trust strip */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0c0b0b]/85 to-transparent" />
      </div>

      {/* Phones/tablets: compact stack from the top so headline, offer,
          buttons and the trust strip all land inside the first screen.
          Desktop (lg+): fill the viewport below the 7rem header and anchor
          everything to the bottom edge, capped for ultra-tall screens. */}
      <div className="container-page relative z-10 flex flex-col justify-end pt-10 pb-8 md:pt-12 md:pb-10 lg:min-h-[min(calc(100svh-7rem),54rem)] lg:pb-[5vw]">
        {/* ── Copy block ─────────────────────────────────────────────── */}
        {/* `@container` lets the headline size itself against this block
            (cqi units) rather than the viewport. */}
        <div className="@container max-w-4xl">
          {tagline && (
            <p className="anim-fade mb-4 text-[0.6875rem] uppercase tracking-[0.3em] text-cream/60">
              {tagline}
            </p>
          )}

          <h1
            className="anim-rise text-display text-hero-gradient font-display font-normal text-[length:min(2.5rem,var(--hero-title-fit))] sm:text-[length:min(3.25rem,var(--hero-title-fit))] md:text-[length:min(4rem,var(--hero-title-fit))] lg:text-[length:min(3.75rem,var(--hero-title-fit))] xl:text-[length:min(4.25rem,var(--hero-title-fit))] 2xl:text-[length:min(4.75rem,var(--hero-title-fit))]"
            style={
              {
                "--hero-title-fit": headlineFit(titleParts),
              } as React.CSSProperties
            }
          >
            {titleParts.map((line, i) => (
              <span
                key={i}
                className="block"
                style={
                  { animationDelay: `${0.05 * i}s` } as React.CSSProperties
                }
              >
                {line.map((seg, j) => (
                  <Fragment key={j}>
                    {j > 0 && " "}
                    <span
                      className={cn(
                        // Single tokens (e.g. "Mercedes-Benz") must not
                        // break at the hyphen; Corporate A has no U+2011.
                        !seg.text.includes(" ") && "whitespace-nowrap"
                      )}
                    >
                      {seg.text}
                    </span>
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>

          <p className="anim-rise mt-4 max-w-2xl text-base leading-relaxed text-cream/90 md:mt-5 md:text-lg">
            {preserveBrandWrap(subtitle)}
          </p>

          {/* Offer hook — primary conversion driver */}
          <p className="anim-rise mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-cream/85">
            <BadgePercent
              size={16}
              className="shrink-0 text-whatsapp"
              aria-hidden
            />
            <span>
              <span className="font-bold text-whatsapp">20% OFF</span> your
              first Minor or Major Service
            </span>
            <span aria-hidden className="text-cream/50">
              ·
            </span>
            <span className="text-cream/75">
              Limited slots this month · New customers only. T&amp;Cs apply.
            </span>
          </p>

          <HeroActions />
        </div>

        {/* ── Trust strip ────────────────────────────────────────────── */}
        <HeroTrustStrip
          items={trustItems(badges)}
          className="anim-rise mt-8 md:mt-12 lg:mt-16"
        />
      </div>
    </section>
  );
}
