import { cn, preserveBrandWrap } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          <span className="silver-bar" />
          <p className="text-[11px] uppercase tracking-[0.32em] font-semibold text-silver-shine">
            {eyebrow}
          </p>
          <span className="silver-bar" />
        </div>
      )}
      <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-silver-shine uppercase">
        {preserveBrandWrap(title)}
      </h2>
      {intro && (
        <p className="mt-5 text-base md:text-lg leading-relaxed text-[color:var(--color-silver-300)]">
          {preserveBrandWrap(intro)}
        </p>
      )}
    </div>
  );
}
