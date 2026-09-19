import { BrandText } from "@/components/BrandText";
import { OfferActions } from "@/components/offers/OfferActions";
import type { OfferPillar } from "@/components/offers/OfferHero";
import { offerLeadContext, type Offer } from "@/lib/offers";
import { cn, preserveBrandWrap } from "@/lib/utils";

/**
 * Second slide of the imported-welcome creative: "Imported Mercedes-Benz.
 * Specialist Care." Four specialist pillars, the complimentary health-check
 * sign-off and the welcome-inspection CTA.
 */
export function ImportWelcomeStory({
  offer,
  pillars,
}: {
  offer: Offer;
  pillars: OfferPillar[];
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
        <h2 className="reveal text-display text-hero-gradient mx-auto max-w-4xl font-display font-normal text-[2.25rem] sm:text-5xl lg:text-6xl">
          <span className="block">
            <span className="block sm:inline">Imported </span>
            <BrandText text="Mercedes-Benz." />
          </span>
          <span className="block">
            <BrandText text="Specialist Care." />
          </span>
        </h2>
        <p className="reveal mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-silver-300)] md:mt-6 md:text-lg">
          {preserveBrandWrap(
            "The same SilberArrows standard, wherever its origin."
          )}
        </p>

        <ul className="reveal mx-auto mt-12 grid max-w-5xl grid-cols-2 border-y border-white/10 md:mt-16 md:grid-cols-4">
          {pillars.map(({ icon: Icon, lines }, i) => (
            <li
              key={lines.join(" ")}
              className={cn(
                "flex flex-col items-center px-3 py-8 text-center md:py-10",
                i % 2 === 1 && "border-l border-white/10",
                i >= 2 && "border-t border-white/10 md:border-t-0",
                i >= 1 && "md:border-l md:border-white/10"
              )}
            >
              <Icon size={44} className="shrink-0 text-cream" aria-hidden />
              <span className="mt-3 text-sm leading-snug text-cream/90">
                <span className="block whitespace-nowrap">{lines[0]}</span>
                <span className="block whitespace-nowrap">{lines[1]}</span>
              </span>
            </li>
          ))}
        </ul>

        <p className="reveal mx-auto mt-12 font-display text-[2.5rem] leading-none tracking-[-0.03em] text-cream md:mt-16 md:text-6xl">
          Complimentary
        </p>
        <p className="reveal mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-cream/70">
          Health Check
        </p>
        <p className="reveal mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[color:var(--color-silver-400)]">
          {preserveBrandWrap(
            "Complimentary health check plus 20% off Servicing, ServiceCare Plans and Certified Warranty on your first visit."
          )}
        </p>

        <OfferActions
          context={offerLeadContext(offer, "closing")}
          label="Book a Welcome Inspection"
          align="center"
          className="reveal mt-8 md:mt-10"
        />
      </div>
    </section>
  );
}
