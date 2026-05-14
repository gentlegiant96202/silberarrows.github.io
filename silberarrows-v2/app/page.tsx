import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Contracts } from "@/components/sections/Contracts";
import { Contact } from "@/components/sections/Contact";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { services } from "@/lib/services";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "SilberArrows | Mercedes-Benz Service Center Dubai",
  description:
    "Dubai's trusted Mercedes-Benz specialists since 2011. Expert maintenance, repair & diagnostics at Al Quoz with genuine parts.",
  keywords:
    "SilberArrows, Mercedes-Benz service Dubai, independent Mercedes specialist, Mercedes repair Al Quoz, Mercedes maintenance Dubai, Mercedes diagnostics, genuine parts Dubai",
  alternates: { canonical: site.url },
  openGraph: {
    title: "SilberArrows | Premier Mercedes-Benz Service Center Dubai",
    description:
      "Dubai's trusted independent Mercedes-Benz specialists since 2011. Expert service in Al Quoz with genuine parts.",
    url: site.url,
    images: [defaultOgImage],
  },
};

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <Hero />
      <WhyChooseUs />
      <Services />
      <Team />
      <Contracts />
      <Contact />
      <nav
        aria-label="All Mercedes-Benz Services"
        className="sr-only"
      >
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`}>
            {s.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
