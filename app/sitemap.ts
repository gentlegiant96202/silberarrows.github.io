import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import {
  getAllPublishedSlugs,
  getCategories,
  getPosts,
  POSTS_PER_PAGE,
} from "@/lib/blog/queries";
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
  let paginationPages: MetadataRoute.Sitemap = [];

  try {
    const [{ posts, pagination }, slugs, categories] = await Promise.all([
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

    // Paginated hub pages (/blog/page/2, /3, ...). totalPages here reflects
    // the full result set because we requested 1000 posts above; for
    // pagination URLs we divide that across POSTS_PER_PAGE buckets.
    const hubTotalPages = Math.max(
      1,
      Math.ceil(pagination.total / POSTS_PER_PAGE)
    );
    for (let p = 2; p <= hubTotalPages; p++) {
      paginationPages.push({
        url: `${baseUrl}/blog/page/${p}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.4,
      });
    }

    // Paginated category pages. One Supabase call per category to learn its
    // post count — only emitted for categories with > POSTS_PER_PAGE posts.
    const categoryCounts = await Promise.all(
      categories.map(async (c) => {
        const { pagination: catPagination } = await getPosts(
          1,
          POSTS_PER_PAGE,
          c.slug
        );
        return { slug: c.slug, totalPages: catPagination.totalPages };
      })
    );
    for (const { slug, totalPages } of categoryCounts) {
      for (let p = 2; p <= totalPages; p++) {
        paginationPages.push({
          url: `${baseUrl}/blog/category/${slug}/page/${p}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.3,
        });
      }
    }
  } catch (err) {
    console.error("[sitemap] blog query failed:", err);
  }

  return [
    ...corePages,
    ...servicePages,
    ...categoryPages,
    ...blogPages,
    ...paginationPages,
  ];
}
