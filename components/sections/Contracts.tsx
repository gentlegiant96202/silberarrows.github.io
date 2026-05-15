import { Check } from "lucide-react";
import { contracts } from "@/lib/content";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTAButton } from "@/components/CTAButton";
import { cn } from "@/lib/utils";

export function Contracts({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-28 border-t border-white/5",
        className
      )}
    >
      <div className="container-page">
        <SectionHeader
          eyebrow="Service Contracts"
          title={contracts.heading}
          intro={contracts.sub}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {contracts.plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "group relative overflow-hidden rounded-2xl p-7 md:p-9 glass-card transition",
                plan.featured
                  ? "ring-chrome silver-glow bg-gradient-to-b from-white/[0.07] to-white/[0.01]"
                  : "ring-silver"
              )}
            >
              {plan.featured && (
                <>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
                  <span className="silver-chip absolute right-5 top-5 inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] font-semibold">
                    Most Popular
                  </span>
                </>
              )}

              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-semibold text-white">
                  {plan.name}
                </h3>
                {plan.featured && (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-silver-400)]">
                    Plan
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
                  Starting from
                </span>
              </div>
              <p className="mt-1 text-4xl md:text-5xl font-semibold text-silver-shine">
                {plan.price}
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-silver-300)]">
                {plan.period}
              </p>

              <ul className="mt-7 space-y-2.5">
                {contracts.rows.map((r) => {
                  const value =
                    plan.name === "Standard" ? r.standard : r.premium;
                  const included = value !== "\u2014";
                  return (
                    <li
                      key={r.feature}
                      className={cn(
                        "flex items-center justify-between text-sm",
                        included ? "text-white" : "text-[color:var(--color-silver-600)] line-through"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                            included
                              ? "silver-tick"
                              : "border border-white/10 bg-transparent text-[color:var(--color-silver-700)]"
                          )}
                        >
                          {included ? <Check size={11} strokeWidth={2.5} /> : "\u2013"}
                        </span>
                        {r.feature}
                      </span>
                      <span className="text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-400)]">
                        {value}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <CTAButton
                  label={`Choose ${plan.name}`}
                  variant={plan.featured ? "silver" : "ghost"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
