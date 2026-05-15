import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { CategoryPills } from "@/components/blog/CategoryPills";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import {
  getCategories,
  getCategoryBySlug,
  getPosts,
  POSTS_PER_PAGE,
} from "@/lib/blog/queries";
import { blogOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 300;

type RouteParams = { slug: string; page: string };

function parsePage(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return n;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  const params: Array<{ slug: string; page: string }> = [];
  for (const category of categories) {
    const { pagination } = await getPosts(1, POSTS_PER_PAGE, category.slug);
    for (let p = 2; p <= pagination.totalPages; p++) {
      params.push({ slug: category.slug, page: String(p) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug, page: rawPage } = await params;
  const page = parsePage(rawPage);
  const category = await getCategoryBySlug(slug);
  if (!category || page === null) {
    return {
      title: "Category Not Found | SilberArrows Blog",
      description: "The requested blog category was not found.",
      robots: { index: false, follow: true },
    };
  }
  const canonical =
    page > 1
      ? `${site.url}/blog/category/${slug}/page/${page}`
      : `${site.url}/blog/category/${slug}`;
  const title = `${category.name} (Page ${page}) | SilberArrows Mercedes-Benz Blog Dubai`;
  const description =
    category.description ??
    `${category.name} articles from SilberArrows Mercedes-Benz Dubai.`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [blogOgImage],
    },
  };
}

export default async function BlogCategoryPagedPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug, page: rawPage } = await params;
  const page = parsePage(rawPage);
  if (page === null) notFound();

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  if (page === 1) redirect(`/blog/category/${slug}`);

  const [{ posts, pagination }, categories] = await Promise.all([
    getPosts(page, POSTS_PER_PAGE, slug),
    getCategories(),
  ]);

  if (page > pagination.totalPages) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: category.name, href: `/blog/category/${slug}` },
          { name: `Page ${page}`, href: `/blog/category/${slug}/page/${page}` },
        ]}
      />

      <PageHero
        title={category.name}
        intro={`Page ${page} of ${pagination.totalPages} · ${
          category.description ?? `Articles from SilberArrows tagged ${category.name}.`
        }`}
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.name, href: `/blog/category/${slug}` },
          { label: `Page ${page}` },
        ]}
      />

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <CategoryPills categories={categories} activeSlug={slug} />

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            basePath={`/blog/category/${slug}`}
          />
        </div>
      </section>
    </>
  );
}
