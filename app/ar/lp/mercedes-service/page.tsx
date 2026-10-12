import type { Metadata } from "next";
import { HeroAr } from "@/components/ar/HeroAr";
import { WhyChooseUsAr } from "@/components/ar/WhyChooseUsAr";
import { ServicesAr } from "@/components/ar/ServicesAr";
import { ContractsAr } from "@/components/ar/ContractsAr";
import { ReviewsAr } from "@/components/ar/ReviewsAr";
import { ContactAr } from "@/components/ar/ContactAr";
import { landingAr } from "@/lib/content-ar";
import { defaultOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Arabic landing page for the Google Ads "Arabic – Service & Repair" ad group
 * (صيانة مرسيدس / تصليح مرسيدس / ورشة مرسيدس دبي ...). Same section order as
 * the English /lp/mercedes-service page, fully RTL. Unlike the English LPs it
 * is indexed: it is also the site's only Arabic page for organic search, so
 * its hreflang pair is the indexable English homepage, not the noindex LP.
 */

const canonical = `${site.url}${landingAr.path}`;

export const metadata: Metadata = {
  title: landingAr.metaTitle,
  description: landingAr.metaDescription,
  keywords: landingAr.metaKeywords,
  alternates: {
    canonical,
    languages: {
      ar: canonical,
      en: site.url,
      "x-default": site.url,
    },
  },
  openGraph: {
    title: landingAr.metaTitle,
    description: landingAr.metaDescription,
    url: canonical,
    locale: "ar_AE",
    images: [defaultOgImage],
  },
};

export default function ArabicServiceLandingPage() {
  return (
    <>
      <HeroAr />
      <WhyChooseUsAr />
      <ServicesAr />
      <ContractsAr />
      <ReviewsAr />
      <ContactAr />
    </>
  );
}
