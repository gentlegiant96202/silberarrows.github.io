'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * On thank-you page: if eid in query (after form submit), fires Lead with eventID for CAPI dedup.
 * Otherwise fires Contact once when mounted.
 */
export default function MetaPixelContactEvent() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (typeof window === 'undefined' || !window.fbq) return;

    firedRef.current = true;
    const eid = searchParams.get('eid');

    if (eid) {
      window.fbq('track', 'Lead', {}, { eventID: eid });
    } else {
      window.fbq('track', 'Contact');
    }
  }, [searchParams]);

  return null;
}
