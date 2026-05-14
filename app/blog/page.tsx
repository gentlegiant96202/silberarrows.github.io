import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { CategoryPills } from "@/components/blog/CategoryPills";
import { EmptyState } from "@/components/blog/EmptyState";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { getCategories, getPosts, POSTS_PER_PAGE } from "@/lib/blog/queries";
import { blogOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 300;

const canonical = `${site.url}/blog`;

export const metadata: Metadata = {
  title: "Mercedes-Benz Blog Dubai | SilberArrows Service Guides",
  description:
    "Mercedes-Benz service guides, technical deep-dives and ownership tips from SilberArrows, Dubai's independent Mercedes specialists in Al Quoz.",
  keywords:
    "Mercedes-Benz blog Dubai, Mercedes service tips, Mercedes maintenance guides, SilberArrows blog, Mercedes-Benz ownership Dubai",
  alternates: { canonical },
  openGraph: {
    title: "Mercedes-Benz Blog Dubai | SilberArrows Service Guides",
    description:
      "Mercedes-Benz service guides, deep-dives and ownership tips from SilberArrows in Al Quoz, Dubai.",
    url: canonical,
    images: [blogOgImage],
  },
};

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const { page: rawPage } = await searchParams;
  const page = Math.max(1, parseInt(rawPage ?? "1", 10) || 1);
  const [{ posts, pagination }, categories] = await Promise.all([
    getPosts(page, POSTS_PER_PAGE),
    getCategories(),
  ]);

  const featured = posts[0];
  const rest = posts.slice(1);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: "Mercedes-Benz Blog Dubai | SilberArrows",
    url: canonical,
    description:
      "Mercedes-Benz service guides, technical deep-dives and ownership tips from SilberArrows in Al Quoz, Dubai.",
    isPartOf: { "@id": `${site.url}/#organization` },
    inLanguage: "en-AE",
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.published_at ?? p.created_at,
      dateModified: p.updated_at,
      author: p.author?.name
        ? { "@type": "Person", name: p.author.name }
        : undefined,
      image: p.hero_image ?? undefined,
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <PageHero
        title="The Journal"
        intro="Service guides, technical deep-dives, ownership advice and stories from Dubai's independent Mercedes-Benz specialists."
        backgroundImage="/assets/images/hero-bg-silver-optimized.avif"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <CategoryPills categories={categories} />

          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {featured && page === 1 ? (
                <div className="mt-10">
                  <PostCard post={featured} variant="feature" />
                </div>
              ) : null}

              {(page === 1 ? rest : posts).length ? (
                <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                  {(page === 1 ? rest : posts).map((p) => (
                    <PostCard key={p.id} post={p} />
                  ))}
                </div>
              ) : null}

              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                basePath="/blog"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
