import { cn } from "@/lib/utils";

export type OfferFigure = {
  value: string;
  label: string;
};

/**
 * Editorial percentage pair used by the 10+ creative — large Corporate A
 * figures split by a hairline, small tracked labels underneath.
 */
export function OfferFigures({
  figures,
  className,
}: {
  figures: OfferFigure[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid border-t border-cream/15",
        figures.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4",
        className
      )}
    >
      {figures.map((figure, i) => (
        <li
          key={figure.label}
          className={cn(
            "flex flex-col items-center px-3 py-6 text-center md:py-8",
            i > 0 && "border-l border-cream/10"
          )}
        >
          <span className="font-display text-[3.25rem] leading-none tracking-[-0.03em] text-cream sm:text-6xl md:text-7xl">
            {figure.value}
          </span>
          <span className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-cream/70">
            {figure.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
