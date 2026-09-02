"use client";

import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Numbered chrome badge shown before a step label; turns into a tick when done. */
export function StepBadge({ index, done }: { index: number; done: boolean }) {
  return (
    <span
      className={cn(
        "chrome-badge inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] transition",
        !done && "opacity-90"
      )}
      aria-hidden
    >
      {done ? <Check size={12} strokeWidth={3} /> : index}
    </span>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  step,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  /** Renders a numbered step badge beside the label. */
  step?: number;
  className?: string;
}) {
  const empty = !value;
  const attention = empty && !disabled;

  return (
    <label className={cn("block", className)}>
      <span className="mb-2.5 flex items-center gap-2">
        {step !== undefined && <StepBadge index={step} done={!empty} />}
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-silver-shine">
          {label}
        </span>
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "w-full appearance-none rounded-xl border bg-white/[0.06] px-4 py-4 pr-12 text-base font-medium outline-none transition md:text-[17px]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
            "hover:border-white/40 hover:bg-white/[0.09]",
            "focus:border-[color:var(--color-platinum)] focus:bg-white/[0.1] focus:ring-2 focus:ring-[color:var(--color-platinum)]/30",
            "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/[0.06]",
            attention
              ? "pulse-glow border-white/25 text-[color:var(--color-silver-200)]"
              : empty
                ? "border-white/15 text-[color:var(--color-silver-400)]"
                : "border-white/30 text-white"
          )}
        >
          <option value="" disabled>
            {placeholder ?? `Select ${label.toLowerCase()}`}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#111113] text-white">
              {opt}
            </option>
          ))}
        </select>
        <span
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg transition",
            attention
              ? "silver-tick animate-pulse text-black"
              : "bg-white/10 text-[color:var(--color-silver-300)]"
          )}
        >
          <ChevronDown size={16} strokeWidth={2.5} />
        </span>
      </div>
    </label>
  );
}
