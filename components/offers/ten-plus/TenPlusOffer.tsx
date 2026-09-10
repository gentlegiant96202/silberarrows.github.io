import {
  BrakeDiscIcon,
  CertificateIcon,
  DiagnosticsIcon,
  ToolingIcon,
} from "@/components/icons/TrustIcons";
import { OfferHero, type OfferPillar } from "@/components/offers/OfferHero";
import { TenPlusStory } from "@/components/offers/ten-plus/TenPlusStory";
import { OFFERS_PATH, type Offer } from "@/lib/offers";

/**
 * Body of the "is your Mercedes-Benz over 10 years old?" offer. Section
 * order follows the two-slide creative: photo hook with the 25% / 25%
 * pair, then the proof slide — specialist pillars, sign-off and the
 * 10+ inspection CTA.
 */

const FIGURES = [
  { value: "25%", label: "Off Labour" },
  { value: "25%", label: "Off Parts" },
];

export const TEN_PLUS_PILLARS: OfferPillar[] = [
  { icon: CertificateIcon, lines: ["Factory-Trained", "Technicians"] },
  { icon: DiagnosticsIcon, lines: ["XENTRY", "Diagnostics"] },
  { icon: BrakeDiscIcon, lines: ["Genuine", "Parts"] },
  { icon: ToolingIcon, lines: ["Specialist", "Tooling"] },
];

export function TenPlusOffer({ offer }: { offer: Offer }) {
  return (
    <>
      <OfferHero
        offer={offer}
        figures={FIGURES}
        figuresNote="Preferential pricing for vehicles aged 10 years and over."
        ctaLabel="Book a 10+ Inspection"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Offers", href: OFFERS_PATH },
          { label: offer.shortTitle },
        ]}
      />

      <TenPlusStory offer={offer} pillars={TEN_PLUS_PILLARS} />
    </>
  );
}
