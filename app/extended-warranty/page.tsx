import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WarrantyCalculator } from "@/components/sections/WarrantyCalculator";
import { PlanCrossLink } from "@/components/sections/contracts/PlanCrossLink";
import { Contact } from "@/components/sections/Contact";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  formatPrice,
  getServiceCareStartingPrices,
  getWarrantyStartingPrices,
  SERVICECARE_TERMS,
  WARRANTY_TERMS,
} from "@/lib/serviceWarrantyPricing";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}/extended-warranty`;
const STARTING = getWarrantyStartingPrices();
const SERVICECARE_FROM = formatPrice(getServiceCareStartingPrices().standard);

const title = "Mercedes-Benz Extended Warranty Dubai | SilberArrows";
const description =
  `Mercedes-Benz extended warranty in Dubai: drivetrain cover from ${formatPrice(STARTING.standard)} ` +
  `or comprehensive cover from ${formatPrice(STARTING.premium)}. ` +
  `${WARRANTY_TERMS.coverageMonths} months / ${WARRANTY_TERMS.additionalKm.toLocaleString()} km, transferable, UAE-wide.`;

export const metadata: Metadata = {
  title,
  description,
  keywords:
    "Mercedes extended warranty Dubai, Mercedes-Benz warranty Dubai, Mercedes warranty expired, used Mercedes warranty UAE, Mercedes drivetrain warranty, Mercedes comprehensive warranty, AMG extended warranty Dubai, Mercedes warranty after manufacturer warranty",
  alternates: { canonical },
  openGraph: {
    title,
    description:
      "Mercedes-Benz extended warranty in Dubai. Pick your model for instant Standard and Premium cover pricing.",
    url: canonical,
    images: [defaultOgImage],
  },
};

export default function ExtendedWarrantyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Extended Warranty", href: "/extended-warranty" },
        ]}
      />
      <PageHero
        title="Mercedes-Benz Extended Warranty"
        intro="Protect your Mercedes-Benz beyond the manufacturer warranty. Standard drivetrain or Premium comprehensive cover, labour and materials included, transferable and valid UAE-wide. Choose your model to see instant pricing."
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Extended Warranty" },
        ]}
      />
      <WarrantyCalculator className="pt-0 md:pt-0 border-t-0" />
      <PlanCrossLink
        eyebrow="Also Available"
        title="Prepay your servicing at today's rates"
        body={`ServiceCare maintenance plans cover your scheduled Service A and Service B visits. Standard ${SERVICECARE_TERMS.standard.label} from ${SERVICECARE_FROM}, Premium ${SERVICECARE_TERMS.premium.label} with transmission, coolant and spark plug service included.`}
        href="/service-contracts"
        cta="Service Contracts"
      />
      <Contact />
    </>
  );
}
