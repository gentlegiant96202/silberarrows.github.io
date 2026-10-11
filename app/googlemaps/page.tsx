import type { Metadata } from "next";
import { GoogleMapsLaunch } from "@/components/GoogleMapsLaunch";
import { site } from "@/lib/site";

const canonical = `${site.url}/googlemaps`;

export const metadata: Metadata = {
  title: "Workshop pin | SilberArrows Al Quoz",
  description:
    "Open the SilberArrows Mercedes-Benz workshop pin on Google Maps. Al Manara Street, Al Quoz, Dubai.",
  robots: { index: false, follow: false },
  alternates: { canonical },
  openGraph: {
    title: "Workshop pin | SilberArrows Al Quoz",
    description: "Al Manara Street, Al Quoz, Dubai — open the pin in Google Maps.",
    url: canonical,
  },
};

export default function GoogleMapsPage() {
  return <GoogleMapsLaunch />;
}
