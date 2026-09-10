import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCareCalculator } from "@/components/sections/ServiceCareCalculator";
import { PlanCrossLink } from "@/components/sections/contracts/PlanCrossLink";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { HashRedirect } from "@/components/HashRedirect";
import {
  formatPrice,
  getServiceCareStartingPrices,
  getWarrantyStartingPrices,
  SERVICECARE_TERMS,
} from "@/lib/serviceWarrantyPricing";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}/service-contracts`;
const STARTING = getServiceCareStartingPrices();
const WARRANTY_FROM = formatPrice(getWarrantyStartingPrices().standard);

const title = "Mercedes-Benz Service Contracts Dubai | ServiceCare Plans | SilberArrows";
const description =
  `Mercedes-Benz service contracts in Dubai. Prepaid ServiceCare maintenance plans: ` +
  `Standard ${SERVICECARE_TERMS.standard.label} from ${formatPrice(STARTING.standard)}, ` +
  `Premium ${SERVICECARE_TERMS.premium.label} from ${formatPrice(STARTING.premium)}. ` +
  `Pick your model for instant pricing.`;

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "Mercedes service contracts Dubai, Mercedes-Benz service contract, Mercedes maintenance plans, Mercedes service packages Dubai, ServiceCare, prepaid Mercedes servicing, C-Class maintenance contract, E-Class service Dubai",
  alternates: { canonical },
  openGraph: {
    title,
    description:
      "Mercedes-Benz service contracts in Dubai. Pick your model for instant ServiceCare Standard and Premium pricing.",
    url: canonical,
    images: [defaultOgImage],
  },
};

export default function ServiceContractsPage() {
  return (
    <>
      {/* The warranty calculator used to live on this page under #warranty. */}
      <HashRedirect hash="#warranty" to="/extended-warranty" />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Service Contracts", href: "/service-contracts" },
        ]}
      />
      <PageHero
        title="Mercedes-Benz Service Contracts"
        intro="Prepay your scheduled servicing at today's rates. ServiceCare Standard and Premium plans for every Mercedes-Benz model, carried out by factory-trained technicians with genuine parts. Choose your model to see instant pricing."
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Service Contracts" },
        ]}
      />
      <ServiceCareCalculator className="pt-0 md:pt-0 border-t-0" />
      <PlanCrossLink
        eyebrow="Also Available"
        title="Protection beyond the factory warranty"
        body={`Extended Warranty picks up where manufacturer cover ends. Standard drivetrain cover from ${WARRANTY_FROM}, Premium comprehensive cover, 12 months / 20,000 km, transferable and UAE-wide.`}
        href="/extended-warranty"
        cta="Extended Warranty"
      />
      <Contact />
    </>
  );
}
