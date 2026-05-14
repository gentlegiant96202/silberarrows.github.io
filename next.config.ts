import type { NextConfig } from "next";

function hostFromEnv(envName: string): string | null {
  const url = process.env[envName];
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

const supabaseHosts = Array.from(
  new Set(
    [
      hostFromEnv("NEXT_PUBLIC_SUPABASE_URL"),
      hostFromEnv("NEXT_PUBLIC_SUPABASE_BLOG_URL"),
    ].filter((h): h is string => Boolean(h))
  )
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mercedes-benz.silberarrows.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.in",
        pathname: "/storage/v1/object/public/**",
      },
      ...supabaseHosts.map((hostname) => ({
        protocol: "https" as const,
        hostname,
        pathname: "/storage/v1/object/public/**",
      })),
    ],
  },
};

export default nextConfig;
