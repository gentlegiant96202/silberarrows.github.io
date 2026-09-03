import { Check } from "lucide-react";
import { contracts } from "@/lib/content";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTAButton } from "@/components/CTAButton";
import { cn } from "@/lib/utils";

export function Contracts({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-clip border-t border-white/[0.06] py-20 md:py-28",
        className
      )}
    >
      <div className="container-page">
        <div className="reveal">
          <SectionHeader
            variant="split"
            eyebrow="Service Contracts"
            title={contracts.heading}
            intro={contracts.sub}
          />
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-6">
          {contracts.plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "reveal surface group relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10",
                plan.featured && "ring-chrome"
              )}
            >
              {plan.featured && (
                <>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(229,228,226,0.16), transparent 70%)",
                    }}
                  />
                </>
              )}

              {/* Plan header */}
              <div className="relative flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {plan.name}
                    </h3>
                    {plan.featured && (
                      <span className="text-[0.625rem] uppercase tracking-[0.2em] text-[color:var(--color-silver-400)]">
                        Plan
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
                    {plan.description}
                  </p>
                </div>
                {plan.featured && (
                  <span className="silver-chip inline-flex items-center rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.22em]">
                    Most Popular
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="relative mt-8 border-t border-white/10 pt-6">
                <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
                  Starting from
                </span>
                <p className="mt-2 text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-silver-shine sm:text-5xl md:text-6xl">
                  {plan.price}
                </p>
                <p className="mt-3 text-sm text-[color:var(--color-silver-300)]">
                  {plan.period}
                </p>
              </div>

              {/* Inclusions */}
              <ul className="relative mt-7 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {contracts.rows.map((r) => {
                  const value =
                    plan.name === "Standard" ? r.standard : r.premium;
                  const included = value !== "\u2014";
                  return (
                    <li
                      key={r.feature}
                      className={cn(
                        "flex items-center justify-between gap-4 py-3 text-sm",
                        included
                          ? "text-white"
                          : "text-[color:var(--color-silver-600)] line-through"
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={cn(
                            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.625rem]",
                            included
                              ? "silver-tick"
                              : "border border-white/10 bg-transparent text-[color:var(--color-silver-700)]"
                          )}
                        >
                          {included ? (
                            <Check size={11} strokeWidth={2.5} />
                          ) : (
                            "\u2013"
                          )}
                        </span>
                        <span className="leading-snug">{r.feature}</span>
                      </span>
                      <span className="shrink-0 text-xs uppercase tracking-[0.16em] text-[color:var(--color-silver-400)]">
                        {value}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="relative mt-8">
                <CTAButton
                  label={`Choose ${plan.name}`}
                  variant={plan.featured ? "silver" : "ghost"}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
