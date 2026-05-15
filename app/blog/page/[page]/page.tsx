import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { CategoryPills } from "@/components/blog/CategoryPills";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { getCategories, getPosts, POSTS_PER_PAGE } from "@/lib/blog/queries";
import { blogOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 300;

type RouteParams = { page: string };

function parsePage(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

export async function generateStaticParams() {
  const { pagination } = await getPosts(1, POSTS_PER_PAGE);
  if (pagination.totalPages <= 1) return [];
  return Array.from({ length: pagination.totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { page: rawPage } = await params;
  const page = parsePage(rawPage);
  const canonical =
    page && page > 1
      ? `${site.url}/blog/page/${page}`
      : `${site.url}/blog`;
  const title = page
    ? `Mercedes-Benz Blog Dubai (Page ${page}) | SilberArrows`
    : "Mercedes-Benz Blog Dubai | SilberArrows";
  return {
    title,
    description:
      "Mercedes-Benz service guides, technical deep-dives and ownership tips from SilberArrows in Al Quoz, Dubai.",
    alternates: { canonical },
    openGraph: {
      title,
      description:
        "Mercedes-Benz service guides, deep-dives and ownership tips from SilberArrows in Al Quoz, Dubai.",
      url: canonical,
      images: [blogOgImage],
    },
  };
}

export default async function BlogPagedPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { page: rawPage } = await params;
  const page = parsePage(rawPage);
  if (page === null) notFound();
  // Page 1 lives at /blog — keep a single canonical URL for that slice.
  if (page === 1) redirect("/blog");

  const [{ posts, pagination }, categories] = await Promise.all([
    getPosts(page, POSTS_PER_PAGE),
    getCategories(),
  ]);

  if (page > pagination.totalPages) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: `Page ${page}`, href: `/blog/page/${page}` },
        ]}
      />

      <PageHero
        title="The Journal"
        intro={`Page ${page} of ${pagination.totalPages} · service guides, deep-dives and ownership advice from SilberArrows.`}
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: `Page ${page}` },
        ]}
      />

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <CategoryPills categories={categories} />

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            basePath="/blog"
          />
        </div>
      </section>
    </>
  );
}
