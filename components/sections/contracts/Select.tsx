"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const empty = !value;

  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] font-semibold text-silver-shine">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            "w-full appearance-none rounded-xl border bg-white/[0.06] px-4 py-3.5 pr-11 text-base font-medium outline-none transition",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
            "hover:border-white/40 hover:bg-white/[0.09]",
            "focus:border-[color:var(--color-platinum)] focus:ring-2 focus:ring-[color:var(--color-platinum)]/30 focus:bg-white/[0.1]",
            "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/[0.06]",
            empty
              ? "border-white/20 text-[color:var(--color-silver-400)] pulse-glow"
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
            "pointer-events-none absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg transition",
            empty && !disabled
              ? "silver-tick text-black animate-pulse"
              : "bg-white/10 text-[color:var(--color-silver-300)]"
          )}
        >
          <ChevronDown size={15} strokeWidth={2.5} />
        </span>
      </div>
    </label>
  );
}
