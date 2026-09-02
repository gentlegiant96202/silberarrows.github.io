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
 * the English /lp/mercedes-service page, fully RTL. Like the other LPs it is
 * noindex — it exists for paid traffic, not organic search.
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
      en: `${site.url}/lp/mercedes-service`,
    },
  },
  openGraph: {
    title: landingAr.metaTitle,
    description: landingAr.metaDescription,
    url: canonical,
    locale: "ar_AE",
    images: [defaultOgImage],
  },
  robots: { index: false, follow: true },
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
