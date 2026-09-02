import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn, preserveBrandWrap } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  intro,
  crumbs,
  className,
  backgroundImage,
}: {
  title: string | React.ReactNode;
  intro?: string;
  crumbs?: Crumb[];
  className?: string;
  backgroundImage?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-clip border-b border-white/[0.06] pt-10 pb-12 md:pt-20 md:pb-20",
        className
      )}
    >
      {backgroundImage && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.35]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.65)_0%,rgba(5,5,5,0.85)_60%,rgba(5,5,5,0.98)_100%)]" />
        </div>
      )}

      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,212,216,0.18), transparent 60%)",
        }}
      />

      <div className="container-page relative">
        {crumbs && (
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-[color:var(--color-silver-500)]">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} />}
                {c.href ? (
                  <Link
                    href={c.href}
                    className="hover:text-white transition uppercase tracking-[0.16em]"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="uppercase tracking-[0.16em] text-[color:var(--color-silver-300)]">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 className="text-display anim-rise text-[2.5rem] font-semibold text-silver-shine sm:text-5xl md:text-6xl lg:col-span-7 lg:text-[4.25rem]">
            {preserveBrandWrap(title)}
          </h1>
          {intro && (
            <p className="anim-rise max-w-xl text-base leading-relaxed text-[color:var(--color-silver-300)] md:text-lg lg:col-span-5 lg:justify-self-end lg:border-l lg:border-white/10 lg:pb-1.5 lg:pl-8">
              {preserveBrandWrap(intro)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
