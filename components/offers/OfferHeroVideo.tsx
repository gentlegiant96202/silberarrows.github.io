"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping hero clip. The poster carries the first frame so the hero
 * is never blank, and the clip stays on the poster for reduced-motion users.
 */
export function OfferHeroVideo({
  src,
  poster,
  position,
  className,
}: {
  src: string;
  poster: string;
  position?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden
      className={className}
      style={{ objectPosition: position ?? "center" }}
    />
  );
}
