import {
  BrakeDiscIcon,
  CertificateIcon,
  ContractIcon,
  ShieldCheckIcon,
} from "@/components/icons/TrustIcons";
import { OfferHero, type OfferPillar } from "@/components/offers/OfferHero";
import { OfferTiers } from "@/components/offers/OfferTiers";
import { NextMove } from "@/components/offers/warranty-expired/NextMove";
import { ClosingCTA } from "@/components/offers/warranty-expired/ClosingCTA";
import { contracts, warranty } from "@/lib/content";
import { OFFERS_PATH, offerLeadContext, type Offer } from "@/lib/offers";
import {
  formatPrice,
  getServiceCareStartingPrices,
  getWarrantyStartingPrices,
  SERVICECARE_COMPARISON_FEATURES,
  SERVICECARE_TERMS,
  WARRANTY_COMPARISON_FEATURES,
  WARRANTY_TERMS,
} from "@/lib/serviceWarrantyPricing";

/**
 * Body of the "warranty and service contract expired?" offer. Section order
 * follows the five-slide creative: hook + trust pillars → "what's your next
 * move" menu → ServiceCare comparison → Certified Warranty comparison →
 * closing summary with the CTA pair.
 *
 * All "from" prices are read live from lib/serviceWarrantyPricing so the page
 * and the calculators can never disagree.
 */

const SERVICECARE_FROM = getServiceCareStartingPrices();
const WARRANTY_FROM = getWarrantyStartingPrices();

const SERVICECARE_ID = "servicecare-plans";
const WARRANTY_ID = "certified-warranty";

const pillars: OfferPillar[] = [
  { icon: CertificateIcon, lines: ["Factory-Trained", "Technicians"] },
  { icon: BrakeDiscIcon, lines: ["Genuine", "Parts"] },
  { icon: ContractIcon, lines: ["ServiceCare", "Plans"] },
  { icon: ShieldCheckIcon, lines: ["Certified", "Warranty"] },
];

export function WarrantyExpiredOffer({ offer }: { offer: Offer }) {
  const [standardPlan, premiumPlan] = contracts.plans;
  const [standardCover, premiumCover] = warranty.plans;

  return (
    <>
      <OfferHero
        offer={offer}
        pillars={pillars}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Offers", href: OFFERS_PATH },
          { label: offer.shortTitle },
        ]}
      />

      <NextMove
        items={[
          {
            title: "ServiceCare Plans",
            body: "Prepaid scheduled servicing at today's rates. Standard and Premium plans across every model.",
            href: `#${SERVICECARE_ID}`,
            fromPrice: formatPrice(SERVICECARE_FROM.standard),
          },
          {
            title: "Certified Warranty",
            body: "Continued protection for your Mercedes-Benz once manufacturer cover ends. Drivetrain or comprehensive.",
            href: `#${WARRANTY_ID}`,
            fromPrice: formatPrice(WARRANTY_FROM.standard),
          },
          {
            title: "XENTRY Diagnostics",
            body: "Official Mercedes-Benz diagnosis, coding and software updates on the same system the dealer uses.",
            href: "/services/diagnostics",
          },
          {
            title: "Mercedes-Benz GenuineParts",
            body: "Genuine parts only, fitted to factory procedure and backed by our 12-month parts and labour warranty.",
            href: "/services",
          },
        ]}
      />

      <OfferTiers
        id={SERVICECARE_ID}
        eyebrow="ServiceCare Plans"
        title="ServiceCare Plans"
        intro="Prepaid servicing for your Mercedes-Benz. Lock in today's rates and let us take care of the schedule."
        context={offerLeadContext(offer)}
        pricingHref="/service-contracts"
        vatNote={SERVICECARE_TERMS.vatNote}
        footnote="Service interval: 15,000 km / 12 months · Excl. 5% VAT"
        tiers={[
          {
            name: standardPlan.name,
            description: standardPlan.description,
            coverageLabel: SERVICECARE_TERMS.standard.label,
            price: SERVICECARE_FROM.standard,
            intent: "servicecare-standard",
            features: SERVICECARE_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.standard,
            })),
          },
          {
            name: premiumPlan.name,
            description: premiumPlan.description,
            coverageLabel: SERVICECARE_TERMS.premium.label,
            price: SERVICECARE_FROM.premium,
            featured: true,
            intent: "servicecare-premium",
            features: SERVICECARE_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.premium,
            })),
          },
        ]}
      />

      <OfferTiers
        id={WARRANTY_ID}
        eyebrow="Certified Warranty"
        title="Certified Warranty"
        intro="Continued protection for your Mercedes-Benz after manufacturer cover ends. Transferable, UAE-wide, labour and materials included."
        context={offerLeadContext(offer)}
        pricingHref="/extended-warranty"
        vatNote={WARRANTY_TERMS.vatNote}
        footnote={`Warranty term: ${WARRANTY_TERMS.coverageMonths} months / ${WARRANTY_TERMS.additionalKm.toLocaleString()} km · Excl. 5% VAT`}
        tiers={[
          {
            name: standardCover.name,
            description: standardCover.description,
            coverageLabel: WARRANTY_TERMS.periodLabel,
            price: WARRANTY_FROM.standard,
            intent: "warranty-standard",
            features: WARRANTY_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.standard,
            })),
          },
          {
            name: premiumCover.name,
            description: premiumCover.description,
            coverageLabel: WARRANTY_TERMS.periodLabel,
            price: WARRANTY_FROM.premium,
            featured: true,
            intent: "warranty-premium",
            features: WARRANTY_COMPARISON_FEATURES.map((f) => ({
              name: f.name,
              value: f.premium,
            })),
          },
        ]}
      />

      <ClosingCTA
        context={offerLeadContext(offer, "closing")}
        options={[
          {
            title: "ServiceCare Plans",
            fromPrice: formatPrice(SERVICECARE_FROM.standard),
            body: "Prepaid servicing for your Mercedes-Benz.",
          },
          {
            title: "Certified Warranty",
            fromPrice: formatPrice(WARRANTY_FROM.standard),
            body: "Protection after manufacturer cover.",
          },
        ]}
      />
    </>
  );
}
