import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;
  /**
   * Canonical base path for page 1 — e.g. "/blog" or
   * "/blog/category/eq-electric". Pages 2..N append "/page/N".
   */
  basePath: string;
};

function buildHref(basePath: string, page: number): string {
  const clean = basePath.replace(/\/$/, "");
  if (page <= 1) return clean || "/";
  return `${clean}/page/${page}`;
}

export function Pagination({ page, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-12 flex items-center justify-center gap-1.5"
    >
      {prev ? (
        <Link
          href={buildHref(basePath, prev)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-silver-300)] hover:bg-white/[0.06] hover:text-white transition"
          rel="prev"
        >
          <ChevronLeft size={13} />
          Prev
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.01] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-silver-600)]">
          <ChevronLeft size={13} />
          Prev
        </span>
      )}

      {visible.map((p, i) => {
        const showGap = i > 0 && p - visible[i - 1] > 1;
        const isActive = p === page;
        return (
          <span key={p} className="inline-flex items-center gap-1.5">
            {showGap ? (
              <span className="px-1 text-[color:var(--color-silver-600)]">…</span>
            ) : null}
            {isActive ? (
              <span
                aria-current="page"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg silver-chip text-xs font-semibold text-silver-shine"
              >
                {p}
              </span>
            ) : (
              <Link
                href={buildHref(basePath, p)}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-xs font-medium text-[color:var(--color-silver-300)] hover:bg-white/[0.06] hover:text-white transition"
                )}
              >
                {p}
              </Link>
            )}
          </span>
        );
      })}

      {next ? (
        <Link
          href={buildHref(basePath, next)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-silver-300)] hover:bg-white/[0.06] hover:text-white transition"
          rel="next"
        >
          Next
          <ChevronRight size={13} />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.01] px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--color-silver-600)]">
          Next
          <ChevronRight size={13} />
        </span>
      )}
    </nav>
  );
}
