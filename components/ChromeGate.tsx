"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public marketing chrome (header / footer / mobile bar) on routes
 * that render their own: the internal /ads dashboard, unlisted partner
 * backlink pages, and the Arabic /ar routes, whose layout mounts RTL
 * equivalents instead.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (!pathname) return <>{children}</>;
  if (pathname.startsWith("/ads")) return null;
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return null;
  return <>{children}</>;
}
