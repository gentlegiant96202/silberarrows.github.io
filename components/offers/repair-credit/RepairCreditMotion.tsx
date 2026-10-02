"use client";

import { useEffect, useRef, type PointerEvent } from "react";

/**
 * The gift card and maintenance booklet from the repair-credit reel, played
 * when the section scrolls into view:
 *
 *   card     rises back-first, turns to the AED 500 face and settles, then
 *            sways with a light sweep; it follows the pointer on hover
 *   booklet  arrives closed, the cover turns onto the filled service pages,
 *            and the hand stamp comes down on the signature box, leaving the
 *            imprint on contact
 *
 * Stamp geometry is the reel's `stamp.json`, as fractions of page 21. The
 * resting markup is the finished state, so reduced motion and no-JS see the
 * card face up and the page stamped.
 */

const ASSETS = {
  cardFront: "/assets/images/offers/repair-credit/card-front.png",
  cardBack: "/assets/images/offers/repair-credit/card-back.png",
  cover: "/assets/images/offers/repair-credit/booklet-cover.png",
  left: "/assets/images/offers/repair-credit/booklet-left.png",
  right: "/assets/images/offers/repair-credit/booklet-right.png",
  stamp: "/assets/images/offers/repair-credit/stamp.png",
  stamper: "/assets/images/offers/repair-credit/stamper.png",
} as const;

const STAMP = { cx: 0.7292, cy: 0.8498, w: 0.3648, aspect: 2.0359 };
/** Page 21 is 932 × 1326. */
const PAGE_ASPECT = 1326 / 932;
const STAMP_H = STAMP.w / STAMP.aspect / PAGE_ASPECT;
const STAMPER_W = STAMP.w * 1.1;
const STAMP_TILT = 5;

/** Polished silver from the reel's `polished()`: two soft highlights on a cool grey. */
const FOIL =
  "linear-gradient(118deg, #8d8f94 0%, #c4c6cb 20%, #f6f6f8 36%, #e4e5e8 44%, #b1b3b8 62%, #dcdde0 78%, #9b9da2 100%)";

const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

const BOOK_DELAY = 150;
const OPEN_AT = BOOK_DELAY + 900;
const OPEN_MS = 1100;
const STAMP_AT = OPEN_AT + OPEN_MS + 350;
const STAMP_MS = 1500;
/** Contact, as a fraction of the stamper's run. */
const CONTACT = 0.4;
const CONTACT_AT = STAMP_AT + STAMP_MS * CONTACT;

const CARD_MS = 1500;

type Track = { el: Element | null; keyframes: Keyframe[]; options: KeyframeAnimationOptions };

export function RepairCreditMotion() {
  const root = useRef<HTMLDivElement>(null);
  const cardTilt = useRef<HTMLDivElement>(null);
  const cardSway = useRef<HTMLDivElement>(null);
  const cardTurn = useRef<HTMLDivElement>(null);
  const cardShadow = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);
  const foil = useRef<HTMLDivElement>(null);
  const spread = useRef<HTMLDivElement>(null);
  const press = useRef<HTMLDivElement>(null);
  const leaf = useRef<HTMLDivElement>(null);
  const imprint = useRef<HTMLImageElement>(null);
  const stamper = useRef<HTMLImageElement>(null);
  const stamperShadow = useRef<HTMLDivElement>(null);
  const cardStage = useRef<HTMLDivElement>(null);
  const bookStage = useRef<HTMLDivElement>(null);
  const replayBook = useRef<(() => void) | null>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || typeof node.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cardTracks = (): Track[] => [
      {
        el: cardTurn.current,
        keyframes: [
          { opacity: 0, transform: "translateY(42%) rotateX(28deg) rotateY(180deg) rotateZ(-10deg) scale(0.82)" },
          { opacity: 1, offset: 0.12 },
          { opacity: 1, transform: "translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)" },
        ],
        options: { duration: CARD_MS, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", fill: "both" },
      },
      {
        el: cardShadow.current,
        keyframes: [
          { opacity: 0, transform: "scale(0.6)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        options: { duration: CARD_MS, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", fill: "both" },
      },
      {
        el: cardSway.current,
        keyframes: [
          { transform: "rotateX(0deg) rotateY(0deg) translateY(0)" },
          { transform: "rotateX(4deg) rotateY(-7deg) translateY(-1.5%)", offset: 0.3 },
          { transform: "rotateX(-2deg) rotateY(6deg) translateY(0.5%)", offset: 0.7 },
          { transform: "rotateX(0deg) rotateY(0deg) translateY(0)" },
        ],
        options: { duration: 9000, delay: CARD_MS, iterations: Infinity, easing: "ease-in-out", fill: "both" },
      },
      {
        // The foil's light travels with the sway, as if the card catches it.
        el: foil.current,
        keyframes: [
          { backgroundPosition: "0% 50%" },
          { backgroundPosition: "30% 50%", offset: 0.3 },
          { backgroundPosition: "70% 50%", offset: 0.7 },
          { backgroundPosition: "0% 50%" },
        ],
        options: { duration: 9000, delay: CARD_MS, iterations: Infinity, easing: "ease-in-out", fill: "both" },
      },
      {
        el: sheen.current,
        keyframes: [
          { transform: "translateX(-130%)" },
          { transform: "translateX(130%)", offset: 0.16 },
          { transform: "translateX(130%)" },
        ],
        options: { duration: 6000, delay: CARD_MS - 300, iterations: Infinity, easing: "ease-in-out", fill: "both" },
      },
    ];

    const bookTracks = (): Track[] => [
      {
        el: spread.current,
        keyframes: [
          { opacity: 0, transform: "translate(-25%, 16%) rotateX(24deg)" },
          { opacity: 1, offset: 0.12 },
          { opacity: 1, transform: "translate(-25%, 0) rotateX(7deg)", offset: 0.42 },
          { opacity: 1, transform: "translate(-25%, 0) rotateX(7deg)", offset: 0.5 },
          { opacity: 1, transform: "translate(0, 0) rotateX(0deg)" },
        ],
        options: {
          duration: OPEN_AT + OPEN_MS - BOOK_DELAY,
          delay: BOOK_DELAY,
          easing: "cubic-bezier(0.45, 0, 0.2, 1)",
          fill: "both",
        },
      },
      {
        el: leaf.current,
        keyframes: [{ transform: "rotateY(0deg)" }, { transform: "rotateY(-180deg)" }],
        options: { duration: OPEN_MS, delay: OPEN_AT, easing: "cubic-bezier(0.55, 0, 0.25, 1)", fill: "both" },
      },
      {
        el: stamper.current,
        keyframes: [
          { opacity: 0, transform: `translate(26%, -58%) rotate(${STAMP_TILT + 6}deg) scale(1.16)`, easing: "ease-out" },
          { opacity: 1, transform: `translate(12%, -32%) rotate(${STAMP_TILT + 3}deg) scale(1.1)`, offset: 0.16, easing: "cubic-bezier(0.5, 0, 0.9, 0.5)" },
          { opacity: 1, transform: `translate(0, 0) rotate(${STAMP_TILT}deg) scale(1) scaleY(1)`, offset: CONTACT },
          { opacity: 1, transform: `translate(0, 0) rotate(${STAMP_TILT}deg) scale(1) scaleY(0.955)`, offset: CONTACT + 0.04 },
          { opacity: 1, transform: `translate(0, 0) rotate(${STAMP_TILT}deg) scale(1) scaleY(1)`, offset: CONTACT + 0.1, easing: "cubic-bezier(0.45, 0, 0.75, 1)" },
          { opacity: 1, transform: `translate(30%, -40%) rotate(${STAMP_TILT - 6}deg) scale(1.12)`, offset: 0.86 },
          { opacity: 0, transform: `translate(44%, -60%) rotate(${STAMP_TILT - 9}deg) scale(1.16)` },
        ],
        options: { duration: STAMP_MS, delay: STAMP_AT, fill: "both" },
      },
      {
        el: stamperShadow.current,
        keyframes: [
          { opacity: 0, transform: `translate(18%, 4%) rotate(${STAMP_TILT}deg) scale(1.3)`, filter: "blur(18px)" },
          { opacity: 0.55, transform: `translate(0, 2%) rotate(${STAMP_TILT}deg) scale(1)`, filter: "blur(3px)", offset: CONTACT },
          { opacity: 0.55, transform: `translate(0, 2%) rotate(${STAMP_TILT}deg) scale(1)`, filter: "blur(3px)", offset: CONTACT + 0.1 },
          { opacity: 0, transform: `translate(26%, 4%) rotate(${STAMP_TILT}deg) scale(1.35)`, filter: "blur(18px)", offset: 0.8 },
          { opacity: 0, transform: `translate(26%, 4%) rotate(${STAMP_TILT}deg) scale(1.35)`, filter: "blur(18px)" },
        ],
        options: { duration: STAMP_MS, delay: STAMP_AT, easing: "ease-in-out", fill: "both" },
      },
      {
        el: imprint.current,
        keyframes: [
          { opacity: 0, transform: "scale(1.015)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        options: { duration: 90, delay: CONTACT_AT, easing: "ease-out", fill: "both" },
      },
      {
        el: press.current,
        keyframes: [
          { transform: "scale(1)" },
          { transform: "scale(0.988)", offset: 0.35 },
          { transform: "scale(1)" },
        ],
        options: { duration: 320, delay: CONTACT_AT - 20, easing: "ease-out", fill: "both" },
      },
    ];

    const player = (build: () => Track[]) => {
      let running: Animation[] = [];
      const prepare = () => {
        running.forEach((a) => a.cancel());
        running = build().flatMap(({ el, keyframes, options }) => {
          if (!el) return [];
          const a = el.animate(keyframes, options);
          a.pause();
          return [a];
        });
      };
      prepare();
      return {
        prepare,
        play: () => running.forEach((a) => a.play()),
        cancel: () => running.forEach((a) => a.cancel()),
      };
    };

    const cardPlayer = player(cardTracks);
    const bookPlayer = player(bookTracks);
    replayBook.current = () => {
      bookPlayer.prepare();
      bookPlayer.play();
    };

    // Both wait for the visitor to scroll; nothing plays on page load.
    let scrolled = false;
    const state = new Map<Element, { inView: boolean; played: boolean; p: typeof cardPlayer }>();
    const sync = () => {
      if (!scrolled) return;
      state.forEach((s) => {
        if (s.inView && !s.played) {
          s.played = true;
          s.p.play();
        }
      });
    };
    const onScroll = () => {
      scrolled = true;
      sync();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const s = state.get(entry.target);
          if (!s) return;
          s.inView = entry.intersectionRatio >= 0.5;
          if (!entry.isIntersecting && s.played) {
            s.played = false;
            s.p.prepare();
          }
        });
        sync();
      },
      { threshold: [0, 0.5] }
    );
    [
      [cardStage.current, cardPlayer],
      [bookStage.current, bookPlayer],
    ].forEach(([el, p]) => {
      if (!el) return;
      state.set(el as Element, { inView: false, played: false, p: p as typeof cardPlayer });
      observer.observe(el as Element);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cardPlayer.cancel();
      bookPlayer.cancel();
      replayBook.current = null;
    };
  }, []);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardTilt.current;
    if (!el || e.pointerType !== "mouse") return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    el.style.transform = `rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg)`;
  };
  const onPointerLeave = () => {
    if (cardTilt.current) cardTilt.current.style.transform = "";
  };

  const face = "absolute inset-0 overflow-hidden [backface-visibility:hidden] [border-radius:3.6%/5.6%]";

  return (
    <div
      ref={root}
      className="mx-auto grid max-w-6xl items-center gap-16 text-left lg:grid-cols-2 lg:gap-16"
    >
      {/* ── Gift card ─────────────────────────────────────────────────── */}
      <div>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-silver-shine">
          Repair credit
        </p>
        <h3 className="text-display mt-3 font-display text-3xl text-white md:text-4xl">
          AED 500, on a gift card.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-base">
          Issued in your name with your minor or major service, and spent as
          credit toward any repair.
        </p>

        <div
          ref={cardStage}
          className="relative mx-auto mt-10 max-w-[30rem] py-6 [perspective:1400px]"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <div
            ref={cardShadow}
            aria-hidden
            className="pointer-events-none absolute inset-x-[10%] bottom-0 h-10 rounded-[50%] bg-black/70 blur-2xl"
          />
          <div
            ref={cardTilt}
            className="transition-transform duration-300 ease-out [transform-style:preserve-3d]"
          >
            <div ref={cardSway} className="[transform-style:preserve-3d]">
              <div
                ref={cardTurn}
                className="relative aspect-[1036/664] [transform-style:preserve-3d]"
              >
                <div className={`${face} isolate`}>
                  {/* Silver foil under the print, multiplied — as in the reel. */}
                  <div
                    ref={foil}
                    aria-hidden
                    className="absolute inset-0 bg-[length:220%_100%] bg-[position:30%_50%]"
                    style={{ backgroundImage: FOIL }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.cardFront}
                    alt="SilberArrows gift card in the customer's name, value AED 500"
                    className="relative h-full w-full object-cover mix-blend-multiply"
                    draggable={false}
                  />
                  <div
                    ref={sheen}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-[linear-gradient(105deg,transparent_38%,rgba(255,255,255,0.7)_50%,transparent_62%)] mix-blend-screen"
                  />
                </div>
                <div className={`${face} [transform:rotateY(180deg)]`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.cardBack}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Maintenance booklet ───────────────────────────────────────── */}
      <div>
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-silver-shine">
          Service record
        </p>
        <h3 className="text-display mt-3 font-display text-3xl text-white md:text-4xl">
          Every service documented.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-silver-400)] md:text-base">
          Stamped into your maintenance booklet. A service record from us
          retains your vehicle&apos;s value.
        </p>

        <div
          ref={bookStage}
          role="button"
          tabIndex={0}
          onClick={() => replayBook.current?.()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              replayBook.current?.();
            }
          }}
          aria-label="Replay the service stamp"
          className="mt-10 cursor-pointer [perspective:2200px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/40"
        >
          <div
            ref={spread}
            className="relative aspect-[1864/1326] [transform-origin:50%_100%] [transform-style:preserve-3d]"
          >
            <div ref={press} className="absolute inset-0 [transform-style:preserve-3d]">
              {/* Right page: service 21, the imprint and the hand stamp. */}
              <div className="absolute inset-y-0 right-0 w-1/2 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ASSETS.right}
                  alt="Maintenance booklet service entry, signed off with the SilberArrows stamp"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-black/25 to-transparent"
                />
              </div>

              {/* Cover leaf, hinged on the spine; its back is page 20. */}
              <div
                ref={leaf}
                className="absolute inset-y-0 right-0 z-10 w-1/2 [transform-origin:0%_50%] [transform-style:preserve-3d] [transform:rotateY(-180deg)]"
              >
                <div className="absolute inset-0 overflow-hidden rounded-r-[2px] [backface-visibility:hidden] shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.cover}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
                <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.left}
                    alt="Maintenance booklet service entry, filled in"
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-black/25 to-transparent"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imprint}
                  src={ASSETS.stamp}
                  alt=""
                  aria-hidden
                  className="absolute mix-blend-multiply"
                  style={{
                    left: pct(STAMP.cx - STAMP.w / 2),
                    top: pct(STAMP.cy - STAMP_H / 2),
                    width: pct(STAMP.w),
                  }}
                  draggable={false}
                />
                <div
                  ref={stamperShadow}
                  aria-hidden
                  className="absolute rounded-[12%] bg-black opacity-0"
                  style={{
                    left: pct(STAMP.cx - STAMPER_W / 2),
                    top: pct(STAMP.cy + STAMP_H / 2 - STAMP_H * 1.05),
                    width: pct(STAMPER_W),
                    height: pct(STAMP_H * 1.05),
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={stamper}
                  src={ASSETS.stamper}
                  alt=""
                  aria-hidden
                  className="absolute h-auto opacity-0 [filter:drop-shadow(0_6px_10px_rgba(0,0,0,0.45))] [transform-origin:50%_100%]"
                  style={{
                    left: pct(STAMP.cx - STAMPER_W / 2),
                    bottom: pct(1 - (STAMP.cy + STAMP_H / 2) - 0.012),
                    width: pct(STAMPER_W),
                  }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-[0.625rem] uppercase tracking-[0.22em] text-cream/40">
          Tap the booklet to stamp it again
        </p>
      </div>
    </div>
  );
}
