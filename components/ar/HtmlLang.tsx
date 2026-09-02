"use client";

import { useEffect } from "react";

/**
 * The root layout hard-codes `<html lang="en-AE">`. For the /ar routes we
 * flip the document to Arabic / RTL on mount (screen readers, browser
 * translation prompts, scrollbar side) and restore it on unmount so a
 * client-side navigation back to an English page is not left RTL.
 *
 * The /ar layout wrapper also carries `lang="ar" dir="rtl"` so SSR markup is
 * already correct before this runs.
 */
export function HtmlLang({
  lang = "ar",
  dir = "rtl",
}: {
  lang?: string;
  dir?: "rtl" | "ltr";
}) {
  useEffect(() => {
    const html = document.documentElement;
    const prevLang = html.getAttribute("lang");
    const prevDir = html.getAttribute("dir");
    html.setAttribute("lang", lang);
    html.setAttribute("dir", dir);
    return () => {
      if (prevLang) html.setAttribute("lang", prevLang);
      else html.removeAttribute("lang");
      if (prevDir) html.setAttribute("dir", prevDir);
      else html.removeAttribute("dir");
    };
  }, [lang, dir]);

  return null;
}
