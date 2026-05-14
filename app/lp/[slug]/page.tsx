import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Contracts } from "@/components/sections/Contracts";
import { Contact } from "@/components/sections/Contact";
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

  return (
    <>
      <Hero
        tagline={lp.tagline}
        titleParts={lp.titleParts}
        subtitle={lp.subtitle}
        badges={lp.badges}
      />
      <WhyChooseUs />
      <Services />
      <Team />
      <Contracts />
      <Contact />
    </>
  );
}
