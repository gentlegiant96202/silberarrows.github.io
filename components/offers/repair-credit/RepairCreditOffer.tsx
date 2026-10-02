import { OfferHero } from "@/components/offers/OfferHero";
import { OfferLeadSection } from "@/components/offers/OfferLeadSection";
import { OfferMobileBar } from "@/components/offers/OfferMobileBar";
import { RepairCreditMotion } from "@/components/offers/repair-credit/RepairCreditMotion";
import { RepairCreditStory } from "@/components/offers/repair-credit/RepairCreditStory";
import { OFFERS_PATH, type Offer } from "@/lib/offers";

/**
 * Body of the new-customer repair-credit offer. The gift card and the
 * stamped booklet sit under the hero, then the lead form, then what the
 * service includes.
 */

const FIGURES = [
  { kicker: "Starting from", value: "972", label: "Minor service", dirham: true },
  { kicker: "Receive", value: "500", label: "Repair credit", dirham: true },
];

export function RepairCreditOffer({ offer }: { offer: Offer }) {
  return (
    <>
      <OfferHero
        offer={offer}
        figures={FIGURES}
        figuresNote="New customers. Mercedes-Benz only."
        ctaLabel="Book a Service"
        titleTone="white"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Offers", href: OFFERS_PATH },
          { label: offer.shortTitle },
        ]}
      />

      <section className="relative border-b border-white/[0.06] py-14 md:py-20">
        <div className="container-page">
          <RepairCreditMotion />
        </div>
      </section>

      <OfferLeadSection
        title="Book your service"
        intro="Leave your name and WhatsApp number. We'll book your minor or major service and apply your AED 500 repair credit."
        highlights={offer.highlights}
        submitLabel="Book My Service"
      />

      <RepairCreditStory offer={offer} />

      <OfferMobileBar label="Book a Service" />
    </>
  );
}
