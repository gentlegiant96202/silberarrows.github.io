import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | SilberArrows Dubai",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="container-page relative py-20 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-silver-400)]">
          404
        </p>
        <h1 className="mt-3 text-5xl md:text-7xl font-semibold text-silver-shine">
          Page not found
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-[color:var(--color-silver-400)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-silver mt-10 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em]"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    </section>
  );
}
