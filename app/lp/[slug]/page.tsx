import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Contracts } from "@/components/sections/Contracts";
import { Contact } from "@/components/sections/Contact";
import { Reviews } from "@/components/sections/Reviews";
import { LandingServiceDetails } from "@/components/sections/LandingServiceDetails";
import { landingPages } from "@/lib/content";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(landingPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lp = landingPages[slug];
  if (!lp) return { title: "Page Not Found" };
  const canonical = `${site.url}/lp/${slug}`;
  return {
    title: lp.metaTitle,
    description: lp.metaDescription,
    keywords: lp.metaKeywords,
    alternates: { canonical },
    openGraph: {
      title: lp.metaTitle,
      description: lp.metaDescription,
      url: canonical,
      images: [defaultOgImage],
    },
    robots: { index: false, follow: true },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lp = landingPages[slug];
  if (!lp) return notFound();

  const isLocation =
    slug === "mercedes-service-center" || slug === "mercedes-service-near-me";
  const isRepair = slug === "mercedes-repair";

  const hero = (
    <Hero
      tagline={lp.tagline}
      titleParts={lp.titleParts}
      subtitle={lp.subtitle}
      badges={lp.badges}
    />
  );

  // Location-intent pages lead with the workshop location (map, Al Quoz
  // address, opening hours, directions) to read as a real local business.
  if (isLocation) {
    return (
      <>
        {hero}
        <Contact />
        <WhyChooseUs />
        <Services />
        <Reviews />
        <Team />
      </>
    );
  }

  // Repair-intent page surfaces the concrete repair capabilities and process
  // (engine, suspension, diagnostics, A/C) from our real service catalogue.
  if (isRepair) {
    return (
      <>
        {hero}
        {lp.relatedServices?.length ? (
          <LandingServiceDetails slugs={lp.relatedServices} />
        ) : null}
        <WhyChooseUs />
        <Reviews />
        <Contracts />
        <Contact />
      </>
    );
  }

  // Service / package-intent pages keep the maintenance + pricing focus.
  return (
    <>
      {hero}
      <WhyChooseUs />
      <Services />
      <Contracts />
      <Reviews />
      <Contact />
    </>
  );
}
