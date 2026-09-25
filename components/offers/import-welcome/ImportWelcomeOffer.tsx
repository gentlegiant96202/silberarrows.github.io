import {
  BrakeDiscIcon,
  CertificateIcon,
  ContractIcon,
  DiagnosticsIcon,
} from "@/components/icons/TrustIcons";
import { OfferHero, type OfferPillar } from "@/components/offers/OfferHero";
import { OfferLeadSection } from "@/components/offers/OfferLeadSection";
import { OfferMobileBar } from "@/components/offers/OfferMobileBar";
import { ImportWelcomeStory } from "@/components/offers/import-welcome/ImportWelcomeStory";
import { OFFERS_PATH, type Offer } from "@/lib/offers";

/**
 * Body of the "is your Mercedes-Benz an import?" welcome programme.
 * Section order follows the two-slide creative: night-workshop hook with
 * the complimentary / 20% pair, the inline lead form, then the proof slide —
 * specialist pillars, health-check sign-off and the welcome-inspection CTA.
 */

const FIGURES = [
  { value: "Complimentary", label: "Health Check", compact: true },
  { value: "20%", label: "First Visit" },
];

export const IMPORT_WELCOME_PILLARS: OfferPillar[] = [
  { icon: CertificateIcon, lines: ["Factory-Trained", "Technicians"] },
  { icon: DiagnosticsIcon, lines: ["XENTRY", "Diagnostics"] },
  { icon: BrakeDiscIcon, lines: ["Genuine", "Parts"] },
  { icon: ContractIcon, lines: ["Specialist", "Care"] },
];

export function ImportWelcomeOffer({ offer }: { offer: Offer }) {
  return (
    <>
      <OfferHero
        offer={offer}
        figures={FIGURES}
        figuresNote="Imported Mercedes-Benz vehicles receive a complimentary health check and 20% off Servicing, ServiceCare Plans and Certified Warranty on their first visit."
        ctaLabel="Book a Welcome Inspection"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Offers", href: OFFERS_PATH },
          { label: offer.shortTitle },
        ]}
      />

      <OfferLeadSection
        title="Book your welcome inspection"
        intro="Leave your name and WhatsApp number. We'll book your complimentary health check and apply your 20% first-visit saving."
        highlights={offer.highlights}
        submitLabel="Book My Welcome Inspection"
      />

      <ImportWelcomeStory offer={offer} pillars={IMPORT_WELCOME_PILLARS} />

      <OfferMobileBar label="Book a Welcome Inspection" />
    </>
  );
}
