import { BrandText } from "@/components/BrandText";
import { OfferActions } from "@/components/offers/OfferActions";
import type { LeadContext } from "@/lib/analytics";
import { preserveBrandWrap } from "@/lib/utils";

export type ClosingOption = {
  title: string;
  fromPrice: string;
  body: string;
};

/**
 * Closing slide: "One Mercedes-Benz. Two ways to protect it." — two options
 * side by side behind a hairline, the sign-off line, and the offer CTA.
 */
export function ClosingCTA({
  options,
  context,
}: {
  options: [ClosingOption, ClosingOption];
  context: LeadContext;
}) {
  return (
    <section className="relative overflow-clip border-t border-white/[0.06] py-20 md:py-28">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,212,216,0.16), transparent 62%)",
        }}
      />

      <div className="container-page relative text-center">
        <h2 className="reveal text-display text-hero-gradient mx-auto max-w-3xl font-display font-normal text-[2.25rem] sm:text-5xl lg:text-6xl">
          <BrandText text="One Mercedes-Benz. Two ways to protect it." />
        </h2>

        <div className="reveal mx-auto mt-12 grid max-w-4xl border-y border-white/10 md:mt-16 md:grid-cols-2">
          {options.map((opt, i) => (
            <div
              key={opt.title}
              className={
                i === 1
                  ? "border-t border-white/10 px-6 py-10 md:border-l md:border-t-0 md:px-10"
                  : "px-6 py-10 md:px-10"
              }
            >
              <h3 className="font-display text-2xl tracking-tight text-white md:text-3xl">
                <BrandText text={opt.title} />
              </h3>
              <p className="mt-3 text-3xl font-semibold leading-none tracking-[-0.02em] text-silver-shine md:text-4xl">
                <span className="text-lg font-normal tracking-normal text-[color:var(--color-silver-400)] md:text-xl">
                  From{" "}
                </span>
                {opt.fromPrice}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-silver-400)]">
                {preserveBrandWrap(opt.body)}
              </p>
            </div>
          ))}
        </div>

        <p className="reveal mx-auto mt-12 max-w-2xl font-display text-2xl leading-tight text-cream md:text-3xl">
          <BrandText text="Your Mercedes-Benz. Still in specialist hands." />
        </p>

        <OfferActions
          context={context}
          align="center"
          className="reveal mt-8 md:mt-10"
        />
      </div>
    </section>
  );
}
