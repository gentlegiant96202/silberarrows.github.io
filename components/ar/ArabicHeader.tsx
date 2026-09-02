"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useContactModal } from "@/components/ContactModalProvider";
import { chromeAr } from "@/lib/content-ar";
import { cn } from "@/lib/utils";

/**
 * Minimal Arabic header for the /ar landing routes. Deliberately has no
 * site navigation: this is a paid-traffic landing page, so the only exits
 * are the contact CTA and a language switch back to the English LP.
 */
export function ArabicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useContactModal();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-page flex h-24 items-center justify-between gap-4 md:h-28">
        <Logo size="responsive" href={chromeAr.homeHref} showWordmark={false} />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={chromeAr.englishHref}
            hrefLang="en"
            lang="en"
            dir="ltr"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium text-[color:var(--color-silver-300)] transition hover:bg-white/10 hover:text-white"
          >
            <Languages size={14} />
            {chromeAr.english}
          </Link>
          <button
            onClick={openModal}
            className="btn-silver rounded-lg px-4 py-2.5 text-xs font-semibold sm:px-5"
          >
            {chromeAr.contactUs}
          </button>
        </div>
      </div>
    </header>
  );
}
