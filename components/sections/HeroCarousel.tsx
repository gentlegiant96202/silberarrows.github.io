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
  /** `sizes` attribute forwarded to next/image. Default suits a half-width frame. */
  sizes?: string;
  /** Slow cinematic zoom on the active slide (disabled for reduced motion). */
  kenBurns?: boolean;
  className?: string;
};

// Minimum horizontal travel in pixels for a touch to count as a swipe.
// Tuned so a fingertip flick reliably triggers but vertical scroll doesn't.
const SWIPE_THRESHOLD = 40;

export function HeroCarousel({
  images,
  intervalMs = 4000,
  transitionMs = 1000,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  kenBurns = false,
  className,
}: HeroCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Only the first slide loads eagerly (it's the LCP candidate); others load
  // as they're needed so they don't contend for bandwidth on initial paint.
  const [loaded, setLoaded] = useState<Set<number>>(
    () => new Set(images.length > 1 ? [0, 1] : [0])
  );
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Ensure the active slide and the one after it are loaded ahead of time.
  useEffect(() => {
    setLoaded((prev) => {
      if (prev.has(active) && prev.has((active + 1) % images.length)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(active);
      next.add((active + 1) % images.length);
      return next;
    });
  }, [active, images.length]);

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

  const zoom = kenBurns && !reducedMotion;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="SilberArrows facility and team"
      className={cn("absolute inset-0 touch-pan-y select-none", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, i) => {
        const isActive = i === active;
        return (
          <div
            key={img.src}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 ease-out",
              isActive ? "opacity-100" : "opacity-0",
              isActive && zoom && "anim-kenburns"
            )}
            style={{
              transitionProperty: "opacity",
              transitionDuration: `${transitionMs}ms`,
            }}
          >
            {loaded.has(i) && (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                sizes={sizes}
                className="object-cover object-center"
                draggable={false}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
