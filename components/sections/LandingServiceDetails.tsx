import { Check } from "lucide-react";
import { services } from "@/lib/services";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { cn } from "@/lib/utils";

export function LandingServiceDetails({
  slugs,
  eyebrow = "Repair Capabilities",
  title = "Mercedes-Benz Repairs We Handle",
  intro = "Specialist repair and diagnostics performed with genuine parts and XENTRY Diagnosis.",
  className,
}: {
  slugs: string[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
}) {
  const items = slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (items.length === 0) return null;

  return (
    <section
      className={cn(
        "relative py-20 md:py-28 border-t border-white/5",
        className
      )}
    >
      <div className="container-page">
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {items.map((service) => (
            <div
              key={service.slug}
              className="rounded-2xl glass-card ring-silver p-7"
            >
              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-silver-400)]">
                {service.overview}
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-silver-400)]">
                {service.bullets.heading}
              </p>
              <ul className="mt-3 grid gap-2">
                {service.bullets.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white/90"
                  >
                    <span className="silver-tick mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
