import { cn, preserveBrandWrap } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Text alignment for the `stack` variant. */
  align?: "center" | "left";
  /**
   * `stack` — eyebrow, title and intro stacked (default; used by inner pages).
   * `split` — editorial layout: eyebrow + title on the left, intro on the
   *           right behind a hairline. Collapses to a left-aligned stack on
   *           small screens.
   */
  variant?: "stack" | "split";
  className?: string;
};

/**
 * Intros at or under this length fit on one line inside the desktop rail
 * (5 cols, max-w-md). One-liners read as taglines and centre on the title
 * block; anything longer is a paragraph and sits on the title's baseline.
 */
const TAGLINE_MAX_CHARS = 48;

export function isTaglineIntro(intro: string) {
  return intro.trim().length <= TAGLINE_MAX_CHARS;
}

function Eyebrow({ text }: { text: string }) {
  return (
    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.32em] text-silver-shine">
      {text}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  variant = "stack",
  className,
}: SectionHeaderProps) {
  if (variant === "split") {
    return (
      <div
        className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}
      >
        {/* Left: eyebrow pinned above the title, title baseline sits on the row's bottom edge */}
        <div className="lg:col-span-7 lg:flex lg:flex-col lg:justify-end">
          {eyebrow && <Eyebrow text={eyebrow} />}
          <h2 className="text-display text-title mt-5 font-semibold text-silver-shine">
            {preserveBrandWrap(title)}
          </h2>
        </div>
        {/* Right: fixed 5-col rail so the hairline lands at the same x in every section
            and spans the full header height. Paragraph intros share the title's
            baseline; one-line taglines centre against the title block. */}
        {intro && (
          <div
            className={cn(
              "lg:col-span-5 lg:flex lg:border-l lg:border-white/10 lg:pl-8",
              isTaglineIntro(intro) ? "lg:items-center" : "lg:items-end"
            )}
          >
            <p
              className={cn(
                "max-w-md text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-[1.0625rem]",
                !isTaglineIntro(intro) && "lg:pb-1"
              )}
            >
              {preserveBrandWrap(intro)}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow text={eyebrow} />}
      <h2 className="text-display text-title mt-5 font-semibold text-silver-shine">
        {preserveBrandWrap(title)}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg">
          {preserveBrandWrap(intro)}
        </p>
      )}
    </div>
  );
}
