"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixelContactEvent() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (typeof window === "undefined" || !window.fbq) return;

    firedRef.current = true;
    const eid = searchParams.get("eid");

    if (eid) {
      window.fbq("track", "Lead", {}, { eventID: eid });
    } else {
      window.fbq("track", "Contact");
    }
  }, [searchParams]);

  return null;
}
