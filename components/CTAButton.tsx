"use client";

import { useContactModal } from "@/components/ContactModalProvider";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTAButton({
  label = "Get a Free Quote",
  sub,
  className,
  variant = "silver",
  size = "md",
}: {
  label?: string;
  sub?: string;
  className?: string;
  variant?: "silver" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const { openModal } = useContactModal();

  const sizes = {
    sm: "px-4 py-2.5 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-7 py-4 text-sm",
  } as const;

  return (
    <button
      onClick={openModal}
      className={cn(
        variant === "silver" ? "btn-silver" : "btn-ghost",
        "group inline-flex items-center justify-center gap-2 rounded-xl font-semibold uppercase tracking-[0.16em]",
        sizes[size],
        className
      )}
    >
      <span className="flex flex-col items-start leading-tight text-left">
        <span className="whitespace-nowrap">{label}</span>
        {sub && (
          <span
            className={cn(
              "mt-0.5 text-[10px] font-normal normal-case tracking-normal whitespace-nowrap",
              variant === "silver" ? "text-black/60" : "text-[color:var(--color-silver-400)]"
            )}
          >
            {sub}
          </span>
        )}
      </span>
      <ArrowRight
        size={16}
        className="transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}
