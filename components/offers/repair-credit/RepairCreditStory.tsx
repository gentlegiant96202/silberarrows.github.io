import { BrandText } from "@/components/BrandText";
import { OfferActions } from "@/components/offers/OfferActions";
import { offerLeadContext, type Offer } from "@/lib/offers";
import { cn, preserveBrandWrap } from "@/lib/utils";

/**
 * The rest of the repair-credit reel: what every minor and major service
 * includes, the stamped service record, and complimentary collection and
 * delivery. Inclusion lines follow the published Service A / B list.
 */

const INCLUDED = [
  {
    title: "Engine maintenance",
    detail: "Engine oil, oil filter and air filter replacement.",
  },
  {
    title: "Fluids",
    detail: "Check and top-up of all fluids.",
  },
  {
    title: "Inspections & diagnostics",
    detail: "Underbody, brakes, tyres and an XENTRY diagnostics check.",
  },
  {
    title: "Counter reset & valet",
    detail: "Maintenance counter reset and a full valet.",
  },
] as const;

export function RepairCreditStory({ offer }: { offer: Offer }) {
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
          <span className="block">Included in every</span>
          <span className="block">
            <BrandText text="minor or major service." />
          </span>
        </h2>
        <p className="reveal mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[color:var(--color-silver-300)] md:mt-6 md:text-lg">
          {preserveBrandWrap(
            "The same factory schedule, genuine parts and specialist care on every Mercedes-Benz we service."
          )}
        </p>

        <ul className="reveal mx-auto mt-12 grid max-w-5xl grid-cols-1 border-y border-white/10 sm:grid-cols-2 md:mt-16">
          {INCLUDED.map(({ title, detail }, i) => (
            <li
              key={title}
              className={cn(
                "px-6 py-8 text-center md:px-8 md:py-10",
                i > 0 && "border-t border-white/10",
                i % 2 === 1 && "sm:border-l sm:border-white/10",
                i === 1 && "sm:border-t-0"
              )}
            >
              <p className="font-display text-2xl text-cream md:text-3xl">
                {title}
              </p>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[color:var(--color-silver-400)]">
                {preserveBrandWrap(detail)}
              </p>
            </li>
          ))}
        </ul>

        <p className="reveal mx-auto mt-14 max-w-xl text-sm leading-relaxed text-[color:var(--color-silver-400)] md:mt-16">
          {preserveBrandWrap(
            "Complimentary vehicle collection and delivery within Dubai."
          )}
        </p>

        <OfferActions
          context={offerLeadContext(offer, "closing")}
          label="Book a Service"
          align="center"
          className="reveal mt-8 md:mt-10"
        />

        <p className="reveal mx-auto mt-8 max-w-xl text-[0.6875rem] uppercase tracking-[0.16em] text-[color:var(--color-silver-500)]">
          {preserveBrandWrap(
            "New customers. Mercedes-Benz only."
          )}
        </p>
      </div>
    </section>
  );
}
