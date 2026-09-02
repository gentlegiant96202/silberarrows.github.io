import { cn } from "@/lib/utils";

/**
 * RTL counterpart of `sections/SectionHeader` (split variant): eyebrow + title
 * on the reading side, intro behind a hairline on the far side. Uses logical
 * border/padding utilities so it mirrors correctly, and no letter-spacing.
 */
export function SectionHeaderAr({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10",
        className
      )}
    >
      <div className="lg:col-span-7">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <span className="silver-bar" />
            <p className="text-[12px] font-semibold text-silver-shine">
              {eyebrow}
            </p>
          </div>
        )}
        <h2 className="text-display mt-5 text-[2.1rem] font-semibold text-silver-shine sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="max-w-xl text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg lg:col-span-5 lg:justify-self-end lg:border-s lg:border-white/10 lg:pb-1.5 lg:ps-8">
          {intro}
        </p>
      )}
    </div>
  );
}
