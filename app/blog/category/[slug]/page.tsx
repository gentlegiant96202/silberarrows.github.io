import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { CategoryPills } from "@/components/blog/CategoryPills";
import { EmptyState } from "@/components/blog/EmptyState";
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

type RouteParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return {
      title: "Category Not Found | SilberArrows Blog",
      description: "The requested blog category was not found.",
      robots: { index: false, follow: true },
    };
  }
  const canonical = `${site.url}/blog/category/${slug}`;
  const title = `${category.name} | SilberArrows Mercedes-Benz Blog Dubai`;
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

export default async function BlogCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<{ page?: string }>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const category = await getCategoryBySlug(slug);
  if (!category) return notFound();

  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const [{ posts, pagination }, categories] = await Promise.all([
    getPosts(page, POSTS_PER_PAGE, slug),
    getCategories(),
  ]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: category.name, href: `/blog/category/${slug}` },
        ]}
      />

      <PageHero
        title={category.name}
        intro={
          category.description ??
          `Articles from SilberArrows tagged ${category.name}.`
        }
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.name },
        ]}
      />

      <section className="pb-16 md:pb-24">
        <div className="container-page">
          <CategoryPills categories={categories} activeSlug={slug} />

          {posts.length === 0 ? (
            <EmptyState
              title={`No posts in ${category.name} yet`}
              description="We're working on it. Check the main blog for the latest articles."
            />
          ) : (
            <>
              <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                basePath={`/blog/category/${slug}`}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
