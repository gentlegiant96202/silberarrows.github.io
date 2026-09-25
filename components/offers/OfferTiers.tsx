import { SectionHeader } from "@/components/sections/SectionHeader";
import { TierCard, type TierFeature } from "@/components/sections/contracts/TierCard";
import { OfferTierFooter } from "@/components/offers/OfferTierFooter";
import type { LeadContext } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type OfferTier = {
  name: string;
  /** Tagline under the tier name, e.g. "Drivetrain only". */
  description: string;
  /** Coverage term shown under the price, e.g. "2 Years / 30,000 km". */
  coverageLabel: string;
  /** Lowest price across the range (AED, excl. VAT). */
  price: number;
  features: TierFeature[];
  featured?: boolean;
  /** Intent suffix recorded with the lead, e.g. "servicecare-premium". */
  intent: string;
};

/**
 * Two-tier comparison block for an offer page (one per product: ServiceCare
 * Plans, Certified Warranty). Reuses the contracts page `TierCard` with the
 * "From" price label and an offer-aware footer that pre-selects the plan on
 * the inline lead form, so the table copy and "starting from" figures can
 * never drift from the calculators.
 */
export function OfferTiers({
  id,
  eyebrow,
  title,
  intro,
  tiers,
  vatNote,
  footnote,
  pricingHref,
  context,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  tiers: OfferTier[];
  vatNote: string;
  /** Small-print line under the cards (service interval / warranty term). */
  footnote: string;
  /** Deep link to the per-model calculator. */
  pricingHref: string;
  /** Base offer context; each tier appends its own `intent`. */
  context: LeadContext;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 border-t border-white/[0.06] py-20 md:scroll-mt-28 md:py-28",
        className
      )}
    >
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow={eyebrow}
            title={title}
            intro={intro}
          />
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-6">
          {tiers.map((tier) => (
            <TierCard
              key={tier.name}
              className="reveal"
              tierName={tier.name}
              description={tier.description}
              featured={tier.featured}
              coverageLabel={tier.coverageLabel}
              price={tier.price}
              vatNote={vatNote}
              features={tier.features}
              topLabel="From"
              ctaMessage=""
              footer={
                <OfferTierFooter
                  context={{ ...context, intent: tier.intent }}
                  tierName={tier.name}
                  selectionLabel={`${tier.name} ${title}`}
                  featured={tier.featured}
                  pricingHref={pricingHref}
                />
              }
            />
          ))}
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-500)]">
          {footnote}
        </p>
      </div>
    </section>
  );
}
