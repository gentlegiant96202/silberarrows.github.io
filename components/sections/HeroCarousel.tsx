"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type HeroCarouselImage = {
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  images: HeroCarouselImage[];
  /** Time each slide remains fully visible, in ms. Default 4000. */
  intervalMs?: number;
  /** Cross-fade duration in ms. Default 1000. */
  transitionMs?: number;
};

// Minimum horizontal travel in pixels for a touch to count as a swipe.
// Tuned so a fingertip flick reliably triggers but vertical scroll doesn't.
const SWIPE_THRESHOLD = 40;

export function HeroCarousel({
  images,
  intervalMs = 4000,
  transitionMs = 1000,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-rotate. `active` is in deps so manual swipes reset the timer and the
  // user gets a fresh full interval on the slide they just chose.
  useEffect(() => {
    if (images.length < 2 || reducedMotion || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, reducedMotion, paused, active]);

  function goNext() {
    setActive((i) => (i + 1) % images.length);
  }
  function goPrev() {
    setActive((i) => (i - 1 + images.length) % images.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touchStartXRef.current = t.clientX;
    touchStartYRef.current = t.clientY;
  }

  function onTouchEnd(e: React.TouchEvent) {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    if (startX === null || startY === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    // Treat as swipe only if motion is predominantly horizontal, so a vertical
    // page scroll that began in the carousel doesn't trip a slide change.
    if (Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="SilberArrows facility and team"
      className="absolute inset-0 touch-pan-y select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
