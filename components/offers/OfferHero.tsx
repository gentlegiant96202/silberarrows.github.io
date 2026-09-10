import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BrandText } from "@/components/BrandText";
import type { TrustIcon } from "@/components/icons/TrustIcons";
import { OfferActions } from "@/components/offers/OfferActions";
import type { Crumb } from "@/components/sections/PageHero";
import type { Offer } from "@/lib/offers";
import { offerLeadContext } from "@/lib/offers";
import { cn, preserveBrandWrap } from "@/lib/utils";

export type OfferPillar = {
  icon: TrustIcon;
  /** Exactly two display lines. */
  lines: [string, string];
};

/**
 * Offer hero. Same construction as the homepage hero — full-bleed photo
 * toned down by `.hero-photo`, directional `.hero-scrim-copy`, Corporate A
 * headline in the cream→silver gradient, square CTA pair — with the page
 * breadcrumb of the inner pages and a four-point trust row along the base
 * that mirrors the creative's icon strip.
 */
export function OfferHero({
  offer,
  pillars,
  crumbs,
  className,
}: {
  offer: Offer;
  pillars: OfferPillar[];
  crumbs?: Crumb[];
  className?: string;
}) {
  const context = offerLeadContext(offer, "hero");

  return (
    <section
      className={cn(
        "relative isolate overflow-clip border-b border-white/[0.06]",
        className
      )}
    >
      {/* ── Full-bleed backdrop ─────────────────────────────────────────
          Stock photos get the homepage treatment (`.hero-photo` brightness
          filter + full `.hero-scrim-copy`). Creatives flagged `toned` are
          already graded dark, so they skip the filter and only get a light
          scrim to seat the copy and blend into the page. */}
      <div className="absolute inset-0 -z-10">
        <div
          className={cn(
            "absolute inset-0",
            !offer.image.toned && "hero-photo"
          )}
        >
          <Image
            src={offer.image.src}
            alt={offer.image.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: offer.image.position ?? "center" }}
          />
        </div>
        {offer.image.toned ? (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(12,11,11,0.85)_0%,rgba(12,11,11,0.45)_45%,rgba(12,11,11,0.15)_100%)] lg:bg-[linear-gradient(to_right,rgba(12,11,11,0.7)_0%,rgba(12,11,11,0.35)_45%,rgba(12,11,11,0.05)_100%)]" />
        ) : (
          <div className="hero-scrim-copy pointer-events-none absolute inset-0" />
        )}
        {/* Blend out of the (black) sticky header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--color-ink-950)] to-transparent" />
        {/* Ground the trust row */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0c0b0b]/90 to-transparent" />
      </div>

      <div className="container-page relative z-10 flex flex-col justify-end pt-8 pb-8 md:pt-10 md:pb-10 lg:min-h-[min(calc(100svh-7rem),52rem)] lg:pb-[4vw]">
        {crumbs && (
          <nav
            aria-label="Breadcrumb"
            className="anim-fade mb-8 flex items-center gap-1.5 text-xs text-cream/50 md:mb-10"
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="uppercase tracking-[0.16em] transition hover:text-cream"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="uppercase tracking-[0.16em] text-cream/80">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* ── Copy block ──────────────────────────────────────────────── */}
        <div className="max-w-4xl">
          <div className="anim-fade flex flex-wrap items-center gap-3">
            <p className="text-[0.6875rem] uppercase tracking-[0.3em] text-cream/60">
              {preserveBrandWrap(offer.tagline)}
            </p>
            {offer.badge && (
              <span className="silver-chip inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.22em]">
                {offer.badge}
              </span>
            )}
          </div>

          <h1 className="anim-rise text-display text-hero-gradient mt-4 font-display font-normal text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]">
            <BrandText text={offer.title} />
          </h1>

          <p className="anim-rise mt-4 max-w-2xl text-base leading-relaxed text-cream/90 md:mt-5 md:text-lg">
            {preserveBrandWrap(offer.intro)}
          </p>

          <OfferActions context={context} className="anim-rise mt-7" />
        </div>

        {/* ── Trust row ───────────────────────────────────────────────── */}
        <ul className="anim-rise mt-10 grid grid-cols-2 border-t border-cream/15 md:mt-14 md:grid-cols-4 lg:mt-16">
          {pillars.map(({ icon: Icon, lines }, i) => (
            <li
              key={lines.join(" ")}
              className={cn(
                "flex flex-col items-center px-3 py-6 text-center md:py-8",
                // Hairline dividers between cells: 2-up on phones, 4-up from md.
                i % 2 === 1 && "border-l border-cream/10",
                i >= 2 && "border-t border-cream/10 md:border-t-0",
                i >= 1 && "md:border-l md:border-cream/10"
              )}
            >
              <Icon size={44} className="shrink-0 text-cream" aria-hidden />
              <span className="mt-3 text-sm leading-snug text-cream/90">
                <span className="block whitespace-nowrap">{lines[0]}</span>
                <span className="block whitespace-nowrap">{lines[1]}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
