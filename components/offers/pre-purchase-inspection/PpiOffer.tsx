import Image from "next/image";
import Link from "next/link";
import { BrandText } from "@/components/BrandText";
import { OfferActions } from "@/components/offers/OfferActions";
import { OfferHero } from "@/components/offers/OfferHero";
import { OfferLeadSection } from "@/components/offers/OfferLeadSection";
import { OfferMobileBar } from "@/components/offers/OfferMobileBar";
import {
  PPI_SLUG,
  ppiClosing,
  ppiCoverage,
  ppiFindings,
  ppiIntro,
  ppiPricing,
  ppiSteps,
  ppiWhy,
} from "@/lib/pre-purchase-inspection";
import { offerLeadContext, OFFERS_PATH, type Offer } from "@/lib/offers";
import { cn, preserveBrandWrap } from "@/lib/utils";

/**
 * Offer version of /services/pre-purchase-inspection. Copy comes from the
 * same approved PPI text; the full detail stays on the service page.
 */

const FIGURES = [
  { value: "1,500", label: ppiIntro.price.label, dirham: true },
  { value: "500", label: ppiIntro.credit.label, dirham: true },
];

const BODY =
  "text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-[1.0625rem]";
const LINK =
  "text-white underline underline-offset-4 transition hover:text-[color:var(--color-platinum)]";

const tierTone = {
  immediate: "bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.7)]",
  upcoming: "bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.6)]",
  monitor: "silver-dot",
} as const;

export function PpiOffer({ offer }: { offer: Offer }) {
  const cta = preserveBrandWrap(ppiIntro.cta);

  return (
    <>
      <OfferHero
        offer={offer}
        figures={FIGURES}
        figuresNote={ppiPricing.paragraphs[0]}
        ctaLabel={cta}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Offers", href: OFFERS_PATH },
          { label: preserveBrandWrap(offer.shortTitle) },
        ]}
      />

      <OfferLeadSection
        title={ppiClosing.title}
        intro={ppiClosing.text}
        highlights={offer.highlights}
        submitLabel={cta}
      />

      {/* ── Why it matters ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" aria-labelledby="ppi-offer-why">
        <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="reveal lg:col-span-6">
            <div className="ring-silver relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#0a0a0a]">
              <Image
                src="/assets/images/offers/ppi-profile.webp"
                alt="Side profile of a blue Mercedes-AMG G 63 in a bright studio."
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="reveal space-y-5 lg:col-span-6">
            <h2 id="ppi-offer-why" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiWhy.title} />
            </h2>
            {ppiWhy.paragraphs.map((p) => (
              <p key={p} className={BODY}>
                {preserveBrandWrap(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it covers ─────────────────────────────────────────────── */}
      <section
        className="section-band py-20 md:py-28"
        aria-labelledby="ppi-offer-covers"
      >
        <div className="container-page">
          <div className="reveal grid gap-6 lg:grid-cols-12 lg:gap-10">
            <h2
              id="ppi-offer-covers"
              className="text-display text-title font-normal text-cream lg:col-span-5"
            >
              <BrandText text={ppiCoverage.title} />
            </h2>
            <p className={cn(BODY, "lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-10")}>
              {preserveBrandWrap(ppiCoverage.paragraphs[0])}
            </p>
          </div>

          <ul className="reveal mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-4 lg:grid-cols-4">
            {ppiCoverage.areas.map((area, i) => (
              <li
                key={area.id}
                className="ring-silver group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a]"
              >
                <Image
                  src={area.image}
                  alt={area.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <span aria-hidden className="text-xs tabular-nums text-cream/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 text-sm leading-snug text-white md:text-base">
                    {preserveBrandWrap(area.title)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="reveal mt-8 text-sm text-[color:var(--color-silver-400)]">
            <Link href={`/services/${PPI_SLUG}`} className={LINK}>
              {preserveBrandWrap("Mercedes-Benz Pre-Purchase Inspections in Dubai")}
            </Link>
          </p>
        </div>
      </section>

      {/* ── When problems are found ────────────────────────────────────── */}
      <section className="py-20 md:py-28" aria-labelledby="ppi-offer-findings">
        <div className="container-page">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 id="ppi-offer-findings" className="text-display text-title font-normal text-cream">
              <BrandText text={ppiFindings.title} />
            </h2>
            <p className={cn(BODY, "mt-5")}>{preserveBrandWrap(ppiFindings.intro)}</p>
          </div>

          <ul className="reveal mt-12 grid gap-4 md:grid-cols-3">
            {ppiFindings.tiers.map((tier) => (
              <li key={tier.label} className="surface rounded-2xl p-6 md:p-7">
                <span
                  aria-hidden
                  className={cn("block h-2.5 w-2.5 rounded-full", tierTone[tier.tone])}
                />
                <p className="mt-5 text-lg text-white">{tier.label}:</p>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-silver-300)]">
                  {preserveBrandWrap(tier.text)}
                </p>
              </li>
            ))}
          </ul>

          <div className="reveal mt-14 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="space-y-5 lg:col-span-6">
              {[ppiFindings.paragraphs[1], ppiPricing.paragraphs[1]].map((p) => (
                <p key={p} className={BODY}>
                  {preserveBrandWrap(p)}
                </p>
              ))}
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#0a0a0a] p-4 sm:p-6">
                <div className="relative aspect-[1245/743]">
                  <Image
                    src="/assets/images/ppi/report-and-credit-v2.webp"
                    alt="SilberArrows Technical Inspection Report and AED 500 repair credit card."
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to arrange it ──────────────────────────────────────────── */}
      <section className="section-band py-20 md:py-28" aria-labelledby="ppi-offer-steps">
        <div className="container-page">
          <h2
            id="ppi-offer-steps"
            className="reveal text-display text-title max-w-3xl font-normal text-cream"
          >
            <BrandText text={ppiSteps.title} />
          </h2>
          <ol className="reveal mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ppiSteps.steps.map((step, i) => (
              <li key={step.lead} className="surface rounded-2xl p-6 md:p-7">
                <span aria-hidden className="index-num block text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-lg leading-snug text-white">
                  {preserveBrandWrap(step.lead)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-silver-300)]">
                  {preserveBrandWrap(step.text)}
                </p>
              </li>
            ))}
          </ol>

          <OfferActions
            context={offerLeadContext(offer, "closing")}
            label={cta}
            align="center"
            className="reveal mt-14"
          />
        </div>
      </section>

      <OfferMobileBar label={cta} />
    </>
  );
}
