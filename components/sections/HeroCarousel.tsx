"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type HeroCarouselImage = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  images: HeroCarouselImage[];
  /** Time each slide remains fully visible, in ms. Default 5000. */
  intervalMs?: number;
  /** Cross-fade duration in ms. Default 1200. */
  transitionMs?: number;
};

export function HeroCarousel({
  images,
  intervalMs = 5000,
  transitionMs = 1200,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (images.length < 2 || reducedMotion || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, reducedMotion, paused]);

  return (
    <div
      role="region"
      aria-label="SilberArrows facility and team"
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 ease-out",
            i === active ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionProperty: "opacity", transitionDuration: `${transitionMs}ms` }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "auto"}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}
