import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPostListItem } from "@/lib/blog/types";
import { formatPublishedDate } from "@/lib/blog/queries";

type PostCardProps = {
  post: BlogPostListItem;
  variant?: "default" | "feature";
};

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const isFeature = variant === "feature";
  const href = `/blog/${post.slug}`;

  return (
    <article
      className={
        isFeature
          ? "group relative overflow-hidden rounded-3xl ring-chrome silver-glow"
          : "group relative overflow-hidden rounded-2xl ring-silver glass-card transition hover:-translate-y-0.5"
      }
    >
      <Link href={href} className="absolute inset-0 z-30" aria-label={post.title}>
        <span className="sr-only">{post.title}</span>
      </Link>

      <div
        className={
          "relative w-full overflow-hidden " +
          (isFeature ? "aspect-[16/9]" : "aspect-[4/3]")
        }
      >
        {post.hero_image ? (
          <Image
            src={post.hero_image}
            alt={post.hero_image_alt ?? post.title}
            fill
            sizes={isFeature ? "100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.01]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      </div>

      <div
        className={
          isFeature
            ? "relative z-10 -mt-24 px-6 pb-7 sm:px-8"
            : "relative z-10 -mt-16 px-5 pb-6"
        }
      >
        <div className="rounded-2xl glass-card ring-silver p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-400)]">
            {post.category?.name ? (
              <span className="silver-chip rounded-full px-2.5 py-1 text-[9px] font-semibold text-silver-shine">
                {post.category.name}
              </span>
            ) : null}
            {post.published_at ? (
              <time dateTime={post.published_at}>
                {formatPublishedDate(post.published_at)}
              </time>
            ) : null}
            {post.reading_time_minutes ? (
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-[color:var(--color-silver-500)]">
                <Clock size={11} />
                {post.reading_time_minutes} min read
              </span>
            ) : null}
          </div>

          <h3
            className={
              "mt-3 font-semibold leading-snug text-white " +
              (isFeature ? "text-2xl md:text-3xl" : "text-lg")
            }
          >
            {post.title}
          </h3>

          {post.excerpt ? (
            <p
              className={
                "mt-2.5 text-[color:var(--color-silver-300)] " +
                (isFeature ? "text-base leading-relaxed" : "text-sm leading-snug line-clamp-3")
              }
            >
              {post.excerpt}
            </p>
          ) : null}

          {post.author?.name ? (
            <div className="mt-4 flex items-center gap-2">
              {post.author.avatar_url ? (
                <span className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-white/15">
                  <Image
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </span>
              ) : null}
              <span className="text-xs text-[color:var(--color-silver-400)]">
                {post.author.name}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
