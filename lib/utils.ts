import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Replace the ASCII hyphen in brand sequences that must not wrap with the
 * Unicode non-breaking hyphen (U+2011). The source data keeps clean ASCII
 * "Mercedes-Benz" / "Pre-Purchase" so SEO, JSON-LD, llms.txt and other
 * machine-readable surfaces are unaffected; only the rendered display string
 * is altered.
 *
 * Pass-through for non-string inputs so callers can use it safely with
 * ReactNode title props.
 */
export function preserveBrandWrap<T>(input: T): T {
  if (typeof input !== "string") return input;
  return input.replace(/\b(Mercedes|Pre)-(Benz|Purchase)\b/g, "$1\u2011$2") as T;
}
