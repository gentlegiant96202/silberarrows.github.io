import type { Metadata } from "next";
import HomePage, { metadata as homeMetadata } from "../page";
import { site } from "@/lib/site";

const canonical = `${site.url}/chatgpt`;

/**
 * ChatGPT Ads destination: the home page as-is, with WhatsApp links that say
 * the visitor found us on ChatGPT (lib/chatgpt-landing.ts). Kept out of the
 * index so it never competes with the real home page.
 */
export const metadata: Metadata = {
  ...homeMetadata,
  alternates: { canonical },
  openGraph: { ...homeMetadata.openGraph, url: canonical },
  robots: { index: false, follow: true },
};

export default HomePage;
