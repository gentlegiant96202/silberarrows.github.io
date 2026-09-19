import { cn } from "@/lib/utils";
import { isTaglineIntro } from "@/components/sections/SectionHeader";

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
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="lg:col-span-7 lg:flex lg:flex-col lg:justify-end">
        {eyebrow && (
          <div className="flex items-center gap-3">
            <p className="text-[12px] font-semibold text-silver-shine">
              {eyebrow}
            </p>
          </div>
        )}
        <h2 className="text-display text-title mt-5 font-semibold text-silver-shine">
          {title}
        </h2>
      </div>
      {intro && (
        <div
          className={cn(
            "lg:col-span-5 lg:flex lg:border-s lg:border-white/10 lg:ps-8",
            isTaglineIntro(intro) ? "lg:items-center" : "lg:items-end"
          )}
        >
          <p
            className={cn(
              "max-w-md text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-[1.0625rem]",
              !isTaglineIntro(intro) && "lg:pb-1"
            )}
          >
            {intro}
          </p>
        </div>
      )}
    </div>
  );
}
