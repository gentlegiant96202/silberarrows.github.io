import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { BlogPostListItem } from "@/lib/blog/types";
import { formatPublishedDate } from "@/lib/blog/queries";

type PostCardProps = {
  post: BlogPostListItem;
};

export function PostCard({ post }: PostCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl ring-silver glass-card transition duration-300 hover:-translate-y-0.5 silver-glow">
      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      >
        <span className="sr-only">{post.title}</span>
      </Link>

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/[0.04]">
        {post.hero_image ? (
          <Image
            src={post.hero_image}
            alt={post.hero_image_alt ?? post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/[0.02]" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.18em] text-[color:var(--color-silver-400)]">
          {post.category?.name ? (
            <span className="silver-chip rounded-full px-2.5 py-1 text-[0.5625rem] font-semibold text-silver-shine">
              {post.category.name}
            </span>
          ) : null}
          {post.reading_time_minutes ? (
            <span className="ml-auto inline-flex items-center gap-1 text-[0.625rem] text-[color:var(--color-silver-500)]">
              <Clock size={11} />
              {post.reading_time_minutes} min read
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-white line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt ? (
          <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--color-silver-300)] line-clamp-3">
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-[color:var(--color-silver-400)]">
          {post.author?.avatar_url ? (
            <span className="relative h-6 w-6 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image
                src={post.author.avatar_url}
                alt={post.author.name ?? "Author"}
                fill
                sizes="24px"
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
      </div>
    </article>
  );
}
