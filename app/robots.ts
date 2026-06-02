import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const STANDARD_DISALLOW = [
  "/api/",
  "/admin/",
  "/ads",
  "/_next/",
  "/private/",
  "/*.json$",
  "/server.log",
];

function aiAllow(userAgent: string) {
  return {
    userAgent,
    allow: "/",
    disallow: ["/api/", "/admin/", "/_next/", "/private/"],
  };
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: STANDARD_DISALLOW,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: STANDARD_DISALLOW,
      },
      aiAllow("Google-Extended"),
      aiAllow("GPTBot"),
      aiAllow("ChatGPT-User"),
      aiAllow("OAI-SearchBot"),
      aiAllow("anthropic-ai"),
      aiAllow("ClaudeBot"),
      aiAllow("Claude-Web"),
      aiAllow("PerplexityBot"),
      aiAllow("Perplexity-User"),
      aiAllow("Applebot"),
      aiAllow("Applebot-Extended"),
      aiAllow("CCBot"),
      aiAllow("Bytespider"),
      aiAllow("Amazonbot"),
      aiAllow("Meta-ExternalAgent"),
      aiAllow("Meta-ExternalFetcher"),
      aiAllow("FacebookBot"),
      aiAllow("Twitterbot"),
      aiAllow("LinkedInBot"),
      aiAllow("DuckDuckBot"),
      aiAllow("YandexBot"),
      aiAllow("MistralAI-User"),
      aiAllow("Diffbot"),
      aiAllow("cohere-ai"),
      aiAllow("YouBot"),
      {
        userAgent: "*",
        allow: "/",
        disallow: STANDARD_DISALLOW,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
