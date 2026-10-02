import type { Metadata } from "next";
import { ThankYouContent } from "@/components/ThankYouContent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You | SilberArrows Mercedes-Benz Service Dubai",
  description:
    "Thank you for contacting SilberArrows. We will get back to you shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <ThankYouContent
      t={{
        eyebrow: "Request Received",
        title: "We've Got Your Details",
        bodyBefore:
          "A Mercedes-Benz specialist will contact you shortly via",
        bodyChannel: "WhatsApp",
        response: "Average response time: under 5 minutes",
        whatsappCta: "Message Us on WhatsApp Now",
        whatsappHint: "Skip the wait and start the chat yourself.",
        call: "Call",
        rating: `${site.reviews.rating} on Google from ${site.reviews.count}+ reviews`,
        imageAlt: "SilberArrows service advisors at the Al Quoz workshop lounge",
        imageCaption: "Our service advisors are already on it.",
        back: "Back to Home",
        homeHref: "/",
      }}
    />
  );
}
