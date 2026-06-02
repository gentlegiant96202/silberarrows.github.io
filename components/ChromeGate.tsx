"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public marketing chrome (header / footer / mobile bar) on internal
 * routes like the /ads dashboard, which render their own standalone layout.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/ads")) return null;
  return <>{children}</>;
}
