"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Client-side redirect for a URL fragment. Fragments never reach the server,
 * so this is the only way to forward legacy deep links such as
 * `/service-contracts#warranty` after that section moved to its own page.
 * Renders nothing.
 */
export function HashRedirect({ hash, to }: { hash: string; to: string }) {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash.toLowerCase() === hash.toLowerCase()) {
      router.replace(to);
    }
  }, [hash, to, router]);

  return null;
}
