'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires Meta Pixel standard event "Contact" once when mounted.
 * Use on the thank-you page after form submission.
 */
export default function MetaPixelContactEvent() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    if (typeof window === 'undefined' || !window.fbq) return;

    firedRef.current = true;
    window.fbq('track', 'Contact');
  }, []);

  return null;
}
