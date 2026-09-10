import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandText } from "@/components/BrandText";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { preserveBrandWrap } from "@/lib/utils";

export type NextMoveItem = {
  title: string;
  body: string;
  href: string;
  /** Formatted "from" price, e.g. "AED 2,700". Omitted for services. */
  fromPrice?: string;
};

/**
 * "So, what's your next move?" — the creative's four-line menu rendered as an
 * editorial hairline list: index numerals, Corporate A row titles, and the
 * live "from" price on the right where one applies.
 */
export function NextMove({
  items,
  className,
}: {
  items: NextMoveItem[];
  className?: string;
}) {
  return (
    <section className={className ?? "relative border-t border-white/[0.06] py-20 md:py-28"}>
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow="Your Next Move"
            title="So, what's your next move?"
            intro="At SilberArrows, Mercedes-Benz is all we do. From routine servicing to long-term protection, everything your Mercedes-Benz needs is under one roof."
          />
        </div>

        <ol className="mt-12 divide-y divide-white/10 border-y border-white/10 md:mt-16">
          {items.map((item, i) => (
            <li key={item.title} className="reveal">
              <Link
                href={item.href}
                className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 py-6 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[auto_1fr_auto] md:gap-x-8 md:py-8"
              >
                <span
                  aria-hidden
                  className="index-num self-start text-2xl md:text-4xl"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-white md:text-4xl">
                    <BrandText text={item.title} />
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-[0.9375rem]">
                    {preserveBrandWrap(item.body)}
                  </p>
                </div>

                <div className="col-start-2 flex items-center justify-between gap-4 sm:col-start-3 sm:justify-end sm:text-right">
                  {item.fromPrice ? (
                    <span className="leading-tight">
                      <span className="block text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--color-silver-500)]">
                        From
                      </span>
                      <span className="block text-xl font-semibold text-silver-shine md:text-2xl">
                        {item.fromPrice}
                      </span>
                    </span>
                  ) : (
                    <span className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-silver-500)] transition group-hover:text-white">
                      Learn more
                    </span>
                  )}
                  <span className="silver-tick inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-[color:var(--color-silver-400)]">
          {preserveBrandWrap("Mercedes-Benz expertise. Independently delivered.")}
        </p>
      </div>
    </section>
  );
}
