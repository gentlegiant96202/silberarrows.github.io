"use client";

import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The interactive "configurator" shell used by both pricing calculators.
 *
 * Left column: live status (what to do next / what is being shown) and a
 * progress track. Right column: the step controls supplied as children.
 * Stacks on small screens with the status on top so the instruction is the
 * first thing a visitor reads.
 */
export function QuotePanel({
  title,
  status,
  stepsDone,
  stepsTotal,
  canReset,
  onReset,
  note,
  children,
  className,
}: {
  /** Eyebrow, e.g. "Build your quote — interactive" */
  title: React.ReactNode;
  /** Large instruction / result line */
  status: string;
  stepsDone: number;
  stepsTotal: number;
  canReset: boolean;
  onReset: () => void;
  /** Optional helper line rendered under the controls */
  note?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const complete = stepsDone >= stepsTotal;

  return (
    <div
      className={cn(
        "reveal ring-chrome relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-5 sm:p-7 md:p-8 lg:p-10",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-platinum)] to-transparent" />
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(229,228,226,0.16), transparent 70%)",
        }}
      />

      <div className="relative grid gap-7 lg:grid-cols-12 lg:gap-10">
        {/* ── Status ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                {!complete && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-platinum)] opacity-60" />
                )}
                <span className="silver-tick relative inline-flex h-2.5 w-2.5 rounded-full" />
              </span>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-silver-shine">
                {title}
              </p>
            </div>
            {canReset && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-silver-300)] transition hover:border-white/40 hover:text-white"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>

          <p
            key={status}
            className="anim-rise mt-4 text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl"
          >
            {status}
          </p>

          {/* Progress track */}
          <div className="mt-6 flex gap-1.5" aria-hidden>
            {Array.from({ length: stepsTotal }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  i < stepsDone
                    ? "bg-[color:var(--color-platinum)] shadow-[0_0_12px_rgba(229,228,226,0.55)]"
                    : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>

        {/* ── Controls ───────────────────────────────────────────────── */}
        <div className="lg:col-span-8 lg:border-l lg:border-white/10 lg:pl-10">
          {children}
          {note}
        </div>
      </div>
    </div>
  );
}
