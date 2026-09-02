"use client";

import { Check, ArrowLeft } from "lucide-react";
import { contractsAr } from "@/lib/content-ar";
import { SectionHeaderAr } from "@/components/ar/SectionHeaderAr";
import { useContactModal } from "@/components/ContactModalProvider";
import { cn } from "@/lib/utils";

export function ContractsAr() {
  const { openModal } = useContactModal();

  return (
    <section className="relative overflow-clip border-t border-white/[0.06] py-20 md:py-28">
      <div className="container-page">
        <div className="reveal">
          <SectionHeaderAr
            eyebrow={contractsAr.eyebrow}
            title={contractsAr.heading}
            intro={contractsAr.sub}
          />
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-6">
          {contractsAr.plans.map((plan) => (
            <div
              key={plan.key}
              className={cn(
                "reveal surface group relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10",
                plan.featured && "ring-chrome"
              )}
            >
              {plan.featured && (
                <>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
                  <div
                    className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
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
                    <h3 className="text-2xl font-semibold text-white md:text-3xl">
                      {plan.name}
                    </h3>
                    {plan.featured && (
                      <span className="text-[11px] text-[color:var(--color-silver-400)]">
                        {contractsAr.planLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[color:var(--color-silver-400)]">
                    {plan.description}
                  </p>
                </div>
                {plan.featured && (
                  <span className="silver-chip inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold">
                    {contractsAr.mostPopular}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="relative mt-8 border-t border-white/10 pt-6">
                <span className="text-xs text-[color:var(--color-silver-500)]">
                  {contractsAr.startingFrom}
                </span>
                <p className="mt-2 text-[2.5rem] font-semibold leading-none text-silver-shine sm:text-5xl md:text-[3.5rem]">
                  {plan.price}
                </p>
                <p className="mt-3 text-sm text-[color:var(--color-silver-300)]">
                  {plan.period}
                </p>
              </div>

              {/* Inclusions */}
              <ul className="relative mt-7 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {contractsAr.rows.map((r) => {
                  const value = plan.key === "standard" ? r.standard : r.premium;
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
                            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]",
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
                      <span
                        dir="ltr"
                        className="shrink-0 text-xs text-[color:var(--color-silver-400)]"
                      >
                        {value}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="relative mt-8">
                <button
                  onClick={openModal}
                  className={cn(
                    plan.featured ? "btn-silver" : "btn-ghost",
                    "group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold sm:w-auto"
                  )}
                >
                  <span className="whitespace-nowrap">
                    {contractsAr.choose(plan.name)}
                  </span>
                  <ArrowLeft
                    size={16}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
