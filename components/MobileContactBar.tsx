"use client";

import { useContactModal } from "@/components/ContactModalProvider";

export function MobileContactBar() {
  const { open, openModal } = useContactModal();

  return (
    <div
      role="region"
      aria-label="Contact"
      aria-hidden={open ? true : undefined}
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/85 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="container-page pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
        <button
          onClick={openModal}
          className="btn-silver block w-full rounded-xl px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em]"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
