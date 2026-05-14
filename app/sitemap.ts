import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { getAllPublishedSlugs, getCategories, getPosts } from "@/lib/blog/queries";
import { site } from "@/lib/site";

const baseUrl = site.url;

const lastModified = new Date(
  process.env.VERCEL_GIT_COMMIT_SHA ? Date.now() : "2026-05-14T00:00:00.000Z"
);

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service-pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-contracts`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.85,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  let blogPages: MetadataRoute.Sitemap = [];
  let categoryPages: MetadataRoute.Sitemap = [];

  try {
    const [{ posts }, slugs, categories] = await Promise.all([
      getPosts(1, 1000),
      getAllPublishedSlugs(),
      getCategories(),
    ]);

    const slugLastMod = new Map(
      slugs.map(({ slug, updated_at }) => [slug, updated_at])
    );

    blogPages = posts.map((p) => {
      const last =
        slugLastMod.get(p.slug) ??
        p.updated_at ??
        p.published_at ??
        lastModified.toISOString();
      return {
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(last),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });

    categoryPages = categories.map((c) => ({
      url: `${baseUrl}/blog/category/${c.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch (err) {
    console.error("[sitemap] blog query failed:", err);
  }

  return [...corePages, ...servicePages, ...categoryPages, ...blogPages];
}
