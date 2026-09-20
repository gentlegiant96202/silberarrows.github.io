/**
 * CodeHype "Featured on" badge. The href and img src are kept exactly as
 * provided so their crawler can verify the backlink.
 */
export function CodeHypeBadge() {
  return (
    <a
      href="https://codehype.ai/product/silberarrows?utm_source=codehype_badge"
      target="_blank"
      rel="noopener noreferrer"
      dir="ltr"
      aria-label="Featured on CodeHype"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- CodeHype verifies this exact remote src */}
      <img
        src="https://codehype.ai/badges/silberarrows.svg?variant=find-us&v=20"
        alt="Featured on CodeHype"
        width={180}
        height={65}
        loading="lazy"
        decoding="async"
        className="inline-block h-auto max-h-[65px] w-full max-w-[180px] border-0"
      />
    </a>
  );
}
