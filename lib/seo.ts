import { site } from "./site";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${p}`;
}

export const defaultOgImage = {
  url: absoluteUrl("/assets/images/al-manara-location.webp"),
  width: 800,
  height: 600,
  alt: "SilberArrows Mercedes-Benz Service Center Dubai",
} as const;

export const serviceKeywords: Record<string, string> = {
  "scheduled-maintenance":
    "Mercedes scheduled maintenance Dubai, Service A Service B Dubai, Mercedes maintenance Al Quoz, official Mercedes service schedule",
  diagnostics:
    "Mercedes diagnostics Dubai, XENTRY diagnosis, Mercedes computer diagnostics, fault code reading Dubai, Mercedes ECU programming",
  "brake-service":
    "Mercedes brake service Dubai, brake pad replacement, brake disc service, Mercedes brake repair Al Quoz, brake system maintenance",
  "air-conditioning":
    "Mercedes A/C service Dubai, air conditioning repair, Mercedes climate control, A/C gas refill Dubai, cooling system service",
  "engine-repair":
    "Mercedes engine repair Dubai, engine overhaul, Mercedes engine diagnostics, timing chain Dubai, Mercedes engine service Al Quoz",
  "suspension-repair":
    "Mercedes suspension repair Dubai, shock absorber replacement, strut service, Mercedes suspension Dubai, air suspension repair",
  detailing:
    "Mercedes detailing Dubai, car detailing Al Quoz, Mercedes cleaning service, paint protection, interior detailing Dubai",
  "battery-service":
    "Mercedes battery service Dubai, battery test, battery replacement Al Quoz, Mercedes electrical Dubai",
  "tyre-replacement":
    "Mercedes tyre service Dubai, tyre replacement, wheel balancing Dubai, Mercedes tyres Al Quoz",
  "wheel-alignment":
    "Mercedes wheel alignment Dubai, tracking, wheel alignment Al Quoz, Mercedes steering geometry",
};

export function keywordsForServiceSlug(slug: string): string {
  return (
    serviceKeywords[slug] ??
    `Mercedes ${slug.replace(/-/g, " ")} Dubai, Mercedes service Al Quoz, SilberArrows`
  );
}
