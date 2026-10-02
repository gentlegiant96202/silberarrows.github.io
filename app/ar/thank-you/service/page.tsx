import type { Metadata } from "next";
import { ThankYouContent } from "@/components/ThankYouContent";
import { chromeAr, siteAr, thankYouAr } from "@/lib/content-ar";

export const metadata: Metadata = {
  title: thankYouAr.metaTitle,
  description: thankYouAr.metaDescription,
  robots: { index: false, follow: false },
};

/**
 * Arabic thank-you page. The Arabic contact modal redirects here with the same
 * `?eid=` as the English flow, so the Meta Lead and the Google Ads "Web Form
 * Lead" conversion fire (deduped) exactly as they do on /thank-you/service.
 */
export default function ArabicThankYouPage() {
  return (
    <ThankYouContent
      rtl
      t={{
        ...thankYouAr,
        homeHref: chromeAr.homeHref,
        whatsappHref: siteAr.whatsapp,
      }}
    />
  );
}
