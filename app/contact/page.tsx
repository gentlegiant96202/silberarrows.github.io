import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Contact } from "@/components/sections/Contact";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

const canonical = `${site.url}/contact`;

export const metadata: Metadata = {
  title: "Contact SilberArrows | Mercedes-Benz Service Dubai | Al Manara Street",
  description:
    "Visit SilberArrows Mercedes-Benz service in Al Quoz, Dubai. Call +971 4 380 5515 or WhatsApp for expert service.",
  keywords:
    "SilberArrows contact, Mercedes service Dubai contact, Al Manara Street garage, Mercedes repair Al Quoz, Dubai Mercedes specialist contact",
  alternates: { canonical },
  openGraph: {
    title: "Contact SilberArrows | Mercedes-Benz Service Dubai",
    description:
      "Visit our Mercedes-Benz service center in Al Quoz, Dubai. Expert repair & maintenance services.",
    url: canonical,
    images: [defaultOgImage],
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <PageHero
        title="Contact Us"
        intro="Get in touch with Dubai's trusted Mercedes-Benz specialists."
        backgroundImage="/assets/images/al-manara-location.webp"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Contact showHeader={false} />
    </>
  );
}
