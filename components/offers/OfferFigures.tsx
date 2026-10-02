import { DirhamIcon } from "@/components/icons/DirhamIcon";
import { cn } from "@/lib/utils";

export type OfferFigure = {
  value: string;
  label: string;
  /**
   * Marks a word-length value (e.g. "Complimentary"). If any figure in the
   * pair is compact, the whole row uses one shared size so a long word and
   * a short percentage stay optically balanced.
   */
  compact?: boolean;
  /** Lead-in above the figure, e.g. "Starting from" or "Receive". */
  kicker?: string;
  /** Draw the UAE dirham mark in front of the value. */
  dirham?: boolean;
};

/**
 * Editorial figure pair used by offer heroes — large Corporate A values
 * split by a hairline, small tracked labels underneath. Percentage-only
 * pairs (10+) stay at display scale; a compact word in the set pulls
 * every value down to one shared size.
 */
export function OfferFigures({
  figures,
  className,
}: {
  figures: OfferFigure[];
  className?: string;
}) {
  const pair = figures.some((figure) => figure.compact);

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
          key={`${figure.kicker ?? ""}-${figure.value}`}
          className={cn(
            "flex flex-col items-center justify-center px-2 py-6 text-center sm:px-4 md:py-8",
            i > 0 && "border-l border-cream/10"
          )}
        >
          {figure.kicker && (
            <span className="mb-3 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-cream/70 sm:text-[0.6875rem]">
              {figure.kicker}
            </span>
          )}
          <span
            className={cn(
              "flex min-h-[1.15em] items-baseline justify-center gap-[0.1em] font-display leading-none tracking-[-0.03em] text-cream",
              pair
                ? "text-[clamp(1.35rem,3.6vw,3rem)]"
                : "text-[3.25rem] sm:text-6xl md:text-7xl"
            )}
          >
            {figure.dirham && (
              <DirhamIcon
                className="h-[0.66em] w-auto shrink-0 self-baseline"
                role="img"
                aria-label="Dirham"
              />
            )}
            {figure.value}
          </span>
          <span className="mt-3 min-h-[1.2em] text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-cream/70 sm:text-[0.6875rem]">
            {figure.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
