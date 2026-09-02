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

function Eyebrow({
  text,
  justify,
}: {
  text: string;
  justify: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        justify === "center" ? "justify-center" : "justify-start"
      )}
    >
      <span className="silver-bar" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-silver-shine">
        {text}
      </p>
      {justify === "center" && <span className="silver-bar" />}
    </div>
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
        className={cn(
          "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10",
          className
        )}
      >
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow text={eyebrow} justify="start" />}
          <h2 className="text-display mt-5 text-[2.25rem] font-semibold text-silver-shine sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
            {preserveBrandWrap(title)}
          </h2>
        </div>
        {intro && (
          <p className="max-w-xl text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg lg:col-span-5 lg:justify-self-end lg:border-l lg:border-white/10 lg:pb-1.5 lg:pl-8">
            {preserveBrandWrap(intro)}
          </p>
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
      {eyebrow && (
        <Eyebrow text={eyebrow} justify={align === "center" ? "center" : "start"} />
      )}
      <h2 className="text-display mt-5 text-[2.25rem] font-semibold text-silver-shine sm:text-5xl lg:text-[3.5rem]">
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
