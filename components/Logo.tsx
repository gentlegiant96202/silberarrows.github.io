import Image from "next/image";
import Link from "next/link";

const sizeMap = {
  sm: { wrap: "h-9", mark: 40, markClass: "h-9 w-auto", text: "text-xs" },
  md: { wrap: "h-12", mark: 56, markClass: "h-12 w-auto", text: "text-sm" },
  lg: { wrap: "h-16", mark: 72, markClass: "h-16 w-auto", text: "text-base" },
  xl: { wrap: "h-24", mark: 112, markClass: "h-24 w-auto", text: "text-lg" },
  // Grows with the (taller) header bar on larger screens; rendered at high
  // res so it stays sharp on retina at the desktop size. Height-driven with
  // w-auto so the square source never gets distorted by a flex container.
  responsive: {
    wrap: "h-16 md:h-[5.5rem]",
    mark: 128,
    markClass: "h-16 w-auto md:h-[5.5rem]",
    text: "text-base",
  },
} as const;

export function Logo({
  size = "md",
  href = "/",
  showWordmark = true,
}: {
  size?: keyof typeof sizeMap;
  href?: string | null;
  showWordmark?: boolean;
}) {
  const cls = sizeMap[size];

  const inner = (
    <span className={`inline-flex items-center gap-2.5 ${cls.wrap}`}>
      <Image
        src="/assets/icons/silberarrows-logo.png"
        alt="SilberArrows"
        width={cls.mark}
        height={cls.mark}
        priority
        className={`shrink-0 select-none drop-shadow-[0_2px_10px_rgba(229,228,226,0.25)] ${cls.markClass}`}
      />
      {showWordmark && (
        <span className={`font-semibold tracking-[0.04em] ${cls.text}`}>
          <span className="text-silver-shine">Silber</span>
          <span className="font-light text-[color:var(--color-silver-300)]">
            Arrows
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label="SilberArrows home"
    >
      {inner}
    </Link>
  );
}
