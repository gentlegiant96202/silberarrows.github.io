import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandText } from "@/components/BrandText";
import { cn, preserveBrandWrap } from "@/lib/utils";

/**
 * Hairline hand-off between the two protection pages (Service Contracts ⇄
 * Extended Warranty). The whole row is one link so the click target is
 * generous; the outlined button is purely visual.
 */
export function PlanCrossLink({
  eyebrow,
  title,
  body,
  href,
  cta,
  className,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  className?: string;
}) {
  return (
    <section
      className={cn("relative border-t border-white/[0.06] py-16 md:py-20", className)}
      aria-label={cta}
    >
      <div className="container-page">
        <Link
          href={href}
          className="group reveal grid gap-6 border-y border-white/10 py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:py-10"
        >
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-silver-shine">
              {eyebrow}
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight tracking-tight text-white md:text-4xl">
              <BrandText text={title} />
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-[0.9375rem]">
              {preserveBrandWrap(body)}
            </p>
          </div>

          <span className="btn-outline-cream inline-flex h-14 w-full items-center justify-center gap-2.5 px-9 text-base sm:w-auto">
            {cta}
            <ArrowUpRight
              size={22}
              strokeWidth={1.75}
              className="btn-icon shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
