import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SilberArrows | Mercedes-Benz Service Center Dubai",
    short_name: "SilberArrows",
    description:
      "Dubai's trusted independent Mercedes-Benz service center in Al Quoz. Expert maintenance, repair and diagnostics since 2011.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    orientation: "portrait",
    categories: ["automotive", "business"],
    lang: "en-AE",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
