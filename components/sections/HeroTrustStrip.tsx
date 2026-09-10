import type { TrustIcon } from "@/components/icons/TrustIcons";
import { cn } from "@/lib/utils";

export type HeroTrustItem = {
  icon: TrustIcon;
  /** Exactly two display lines; each is kept on one line. */
  lines: [React.ReactNode, React.ReactNode];
};

/**
 * Split a label into two lines at the space that leaves the halves closest
 * in length. Single-word labels get an empty second line.
 */
export function splitTwoLines(text: string): [string, string] {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return [text, ""];
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const left = words.slice(0, i).join(" ").length;
    const right = words.slice(i).join(" ").length;
    const diff = Math.abs(left - right);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/**
 * Row of stacked trust points (large line icon above a two-line centred
 * label) along the bottom of the hero.
 *
 * From `xl` up all items sit in one static row spread edge to edge. Below
 * that the list is rendered twice inside a clipped track that slides left
 * continuously (CSS in `.hero-strip-track`); the copy is `aria-hidden` and
 * dropped entirely when the user prefers reduced motion, where the strip
 * falls back to a plain horizontal scroller instead.
 */
export function HeroTrustStrip({
  items,
  className,
}: {
  items: HeroTrustItem[];
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        // Bleed to the phone gutter so the marquee runs edge to edge.
        "hero-strip -mx-5 overflow-hidden motion-reduce:overflow-x-auto md:mx-0 xl:overflow-visible",
        className
      )}
    >
      <ul className="hero-strip-track flex w-max items-start xl:w-full xl:justify-between xl:gap-4">
        {doubled.map(({ icon: Icon, lines }, i) => {
          const isCopy = i >= items.length;
          return (
            <li
              key={i}
              aria-hidden={isCopy || undefined}
              className={cn(
                // Right padding instead of `gap` so the doubled track is
                // exactly twice the width of one pass (seamless -50% loop).
                "flex w-[10rem] shrink-0 flex-col items-center pr-6 text-center xl:w-auto xl:min-w-0 xl:flex-1 xl:pr-0",
                isCopy && "motion-reduce:hidden xl:hidden"
              )}
            >
              <Icon size={44} className="shrink-0 text-cream" aria-hidden />
              <span className="mt-3 text-sm leading-snug text-cream/90">
                <span className="block whitespace-nowrap">{lines[0]}</span>
                <span className="block whitespace-nowrap">{lines[1]}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
