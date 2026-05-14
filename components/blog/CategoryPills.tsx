import Link from "next/link";
import type { BlogCategory } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

type CategoryPillsProps = {
  categories: BlogCategory[];
  activeSlug?: string | null;
};

export function CategoryPills({ categories, activeSlug }: CategoryPillsProps) {
  if (!categories.length) return null;

  return (
    <nav
      aria-label="Blog categories"
      className="mt-2 flex flex-wrap items-center gap-2"
    >
      <Link
        href="/blog"
        className={cn(
          "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition",
          activeSlug == null
            ? "silver-chip border-white/15 text-silver-shine"
            : "border-white/10 bg-white/[0.03] text-[color:var(--color-silver-300)] hover:text-white hover:bg-white/[0.06]"
        )}
      >
        All
      </Link>
      {categories.map((c) => {
        const active = activeSlug === c.slug;
        return (
          <Link
            key={c.id}
            href={`/blog/category/${c.slug}`}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition",
              active
                ? "silver-chip border-white/15 text-silver-shine"
                : "border-white/10 bg-white/[0.03] text-[color:var(--color-silver-300)] hover:text-white hover:bg-white/[0.06]"
            )}
          >
            {c.name}
          </Link>
        );
      })}
    </nav>
  );
}
