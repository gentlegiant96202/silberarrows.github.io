import type { Metadata } from "next";
import { CodeHypeBadge } from "@/components/CodeHypeBadge";

/**
 * Unlisted partners page for directory backlinks (CodeHype). Not linked from
 * nav, footer, or sitemap — CodeHype is given this URL to crawl.
 */
export const metadata: Metadata = {
  title: "Partners | SilberArrows",
  robots: { index: true, follow: true },
};

export default function PartnersPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-silver-500)]">
          Featured on
        </p>
        <div className="mt-6">
          <CodeHypeBadge />
        </div>
      </div>
    </main>
  );
}
