import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPostListItem } from "@/lib/blog/types";
import { formatPublishedDate } from "@/lib/blog/queries";

type FeaturePostCardProps = {
  post: BlogPostListItem;
};

export function FeaturePostCard({ post }: FeaturePostCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <article className="group relative grid overflow-hidden rounded-3xl ring-chrome glass-card silver-glow lg:grid-cols-12">
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      >
        <span className="sr-only">{post.title}</span>
      </Link>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/[0.04] lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
        {post.hero_image ? (
          <Image
            src={post.hero_image}
            alt={post.hero_image_alt ?? post.title}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            priority
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[0.02]" />
        )}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-r from-transparent to-black/40 lg:block" />
      </div>

      <div className="relative flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-400)]">
          <span className="silver-chip rounded-full px-2.5 py-1 text-[9px] font-semibold text-silver-shine">
            Featured
          </span>
          {post.category?.name ? <span>{post.category.name}</span> : null}
          {post.reading_time_minutes ? (
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-[color:var(--color-silver-500)]">
              <Clock size={11} />
              {post.reading_time_minutes} min read
            </span>
          ) : null}
        </div>

        <h2 className="mt-4 text-2xl font-semibold leading-tight text-white line-clamp-3 md:text-3xl">
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-silver-300)] line-clamp-4 md:text-base">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-6 flex items-center gap-2 text-xs text-[color:var(--color-silver-400)]">
          {post.author?.avatar_url ? (
            <span className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image
                src={post.author.avatar_url}
                alt={post.author.name ?? "Author"}
                fill
                sizes="28px"
                className="object-cover"
              />
            </span>
          ) : null}
          {post.author?.name ? (
            <span className="text-[color:var(--color-silver-300)]">
              {post.author.name}
            </span>
          ) : null}
          {post.author?.name && post.published_at ? (
            <span className="text-[color:var(--color-silver-700)]">/</span>
          ) : null}
          {post.published_at ? (
            <time dateTime={post.published_at}>
              {formatPublishedDate(post.published_at)}
            </time>
          ) : null}
        </div>

        <div className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-silver-200)] transition group-hover:text-white">
          Read article
          <ArrowUpRight
            size={14}
            className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </article>
  );
}
