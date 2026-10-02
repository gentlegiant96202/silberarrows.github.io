import type { SVGProps } from "react";

/**
 * UAE dirham sign (CBUAE, 2025), redrawn at a light display weight.
 *
 * The CBUAE guideline allows the stroke weight to be adjusted to match the
 * typeface as long as the structure stays intact, so this keeps the official
 * geometry — the D with its flared top and bottom, the curved bowl, and two
 * bars that run past the D on both sides with hooked terminals — and only
 * thins the strokes. Same 344.84 × 299.91 box as the official artwork; the
 * symbol must sit at numeral height on the baseline, left of the figure.
 */
export function DirhamIcon({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 344.84 299.91"
      fill="currentColor"
      className={className}
      {...rest}
    >
      <path
        fillRule="evenodd"
        d="M37.5,0H139.68C222.69,0 278.49,36.7 294.87,104.94C296.7,115 297.4,135 297.4,150C297.4,165 296.7,185 295.06,194.93C279.32,262.95 225.3,299.91 139.68,299.91H37.5C37.5,299.91 52.5,288.5 52.5,250V52.4C52.5,12.63 37.5,0 37.5,0ZM82.5,11V289H139C204,289 246,263 259.5,195C261,182 261.6,166 261.6,150C261.6,134 261,118 259.5,105C246,37 204,11 139,11Z"
      />
      <path d="M17.3,111C11.9,111 6.9,109 2.7,105.1L0,102.6L0,107.6C0,119.9 9,129 21,129H327.54C332.94,129 337.94,131 342.14,134.9L344.84,137.4L344.84,132.4C344.84,120.1 335.84,111 323.84,111Z" />
      <path d="M17.3,171C11.9,171 6.9,169 2.7,165.1L0,162.6L0,167.6C0,179.9 9,189 21,189H327.54C332.94,189 337.94,191 342.14,194.9L344.84,197.4L344.84,192.4C344.84,180.1 335.84,171 323.84,171Z" />
    </svg>
  );
}
