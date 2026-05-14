import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Markdown } from "@/lib/blog/markdown";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { PostCard } from "@/components/blog/PostCard";
import {
  formatPublishedDate,
  getAllPublishedSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/queries";
import { buildPostOgImage, blogOgImage } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

type RouteParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found | SilberArrows Blog",
      description: "The requested blog post was not found.",
      robots: { index: false, follow: true },
    };
  }
  const canonical = `${site.url}/blog/${slug}`;
  const title = post.seo_title ?? `${post.title} | SilberArrows Blog`;
  const description =
    post.seo_description ??
    post.excerpt ??
    "Mercedes-Benz service guide from SilberArrows Dubai.";
  const og = buildPostOgImage({
    url: post.og_image ?? post.hero_image,
    alt: post.hero_image_alt ?? post.title,
  });

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [og],
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.category?.name ? [post.category.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og.url],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const related = await getRelatedPosts(
    post.id,
    post.category?.id ?? null,
    3
  );
  const canonical = `${site.url}/blog/${slug}`;
  const ogImage = post.og_image ?? post.hero_image ?? blogOgImage.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    url: canonical,
    image: ogImage,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    inLanguage: "en-AE",
    isAccessibleForFree: true,
    articleSection: post.category?.name ?? undefined,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role ?? undefined,
          image: post.author.avatar_url ?? undefined,
          worksFor: { "@id": `${site.url}/#business` },
        }
      : { "@type": "Organization", "@id": `${site.url}/#organization` },
    publisher: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "SilberArrows",
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icon.svg`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    about: { "@id": `${site.url}/#business` },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          ...(post.category
            ? [
                {
                  name: post.category.name,
                  href: `/blog/category/${post.category.slug}`,
                },
              ]
            : []),
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="relative pt-24 pb-16 md:pt-32 md:pb-24">
        {post.hero_image ? (
          <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] overflow-hidden">
            <Image
              src={post.hero_image}
              alt={post.hero_image_alt ?? post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-[0.45]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.85)_55%,rgba(5,5,5,1)_100%)]" />
          </div>
        ) : null}

        <div className="container-page">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-[color:var(--color-silver-500)]"
          >
            <Link
              href="/"
              className="uppercase tracking-[0.16em] hover:text-white"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="uppercase tracking-[0.16em] hover:text-white"
            >
              Blog
            </Link>
            {post.category ? (
              <>
                <span>/</span>
                <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="uppercase tracking-[0.16em] hover:text-white"
                >
                  {post.category.name}
                </Link>
              </>
            ) : null}
          </nav>

          <header className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-400)]">
              {post.category?.name ? (
                <span className="silver-chip rounded-full px-2.5 py-1 font-semibold text-silver-shine">
                  {post.category.name}
                </span>
              ) : null}
              {post.published_at ? (
                <time dateTime={post.published_at}>
                  {formatPublishedDate(post.published_at)}
                </time>
              ) : null}
              {post.reading_time_minutes ? (
                <span className="inline-flex items-center gap-1 text-[color:var(--color-silver-500)]">
                  <Clock size={11} />
                  {post.reading_time_minutes} min read
                </span>
              ) : null}
            </div>

            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.05] tracking-[-0.01em] text-silver-shine">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-5 text-lg text-[color:var(--color-silver-300)] leading-relaxed">
                {post.excerpt}
              </p>
            ) : null}

            {post.author ? (
              <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                {post.author.avatar_url ? (
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                    <Image
                      src={post.author.avatar_url}
                      alt={post.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </span>
                ) : null}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
                    Written by
                  </p>
                  <p className="text-sm font-medium text-white">
                    {post.author.name}
                    {post.author.role ? (
                      <span className="ml-1.5 text-[color:var(--color-silver-400)] font-normal">
                        &middot; {post.author.role}
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            ) : null}
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="rounded-2xl glass-card ring-silver p-7 md:p-10">
              <Markdown source={post.body} />
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl glass-card ring-silver p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                  Need help with your Mercedes-Benz?
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  Speak with a specialist
                </h3>
                <p className="mt-2 text-sm text-[color:var(--color-silver-400)]">
                  Free quote, 12-month warranty on parts and labour, free
                  collection and delivery across Dubai.
                </p>
                <Link
                  href="/contact"
                  className="btn-silver mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em]"
                >
                  Contact Us
                  <ArrowRight size={13} />
                </Link>
              </div>
            </aside>
          </div>

          <div className="mt-14 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-400)] hover:text-white"
            >
              <ArrowLeft size={13} /> Back to Blog
            </Link>
          </div>

          {related.length ? (
            <section className="mt-16 border-t border-white/10 pt-12">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-silver-400)]">
                Related Reading
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-silver-shine">
                More from the journal
              </h2>
              <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
