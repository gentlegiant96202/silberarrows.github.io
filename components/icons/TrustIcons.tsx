import type { SVGProps } from "react";

/**
 * Bespoke line-icon set for the hero trust strip.
 *
 * All icons share one 48-unit grid, a single stroke weight, round caps and
 * joins, and draw in `currentColor` so they inherit the surrounding text
 * colour. Keep new icons within the 4–44 unit safe area so the set stays
 * optically balanced.
 */
export type TrustIconProps = Omit<
  SVGProps<SVGSVGElement>,
  "width" | "height" | "strokeWidth"
> & {
  /** Rendered width/height in px. Default 40. */
  size?: number;
  /** Stroke width in grid units (48 = full width). Default 1.4. */
  strokeWidth?: number;
};

export type TrustIcon = React.ComponentType<TrustIconProps>;

function IconBase({
  size = 40,
  strokeWidth = 1.4,
  children,
  ...rest
}: TrustIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Laurel wreath with a star — heritage / established. */
export function LaurelIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M22.89 40.58C12.95 38.37 6.32 27.32 7.42 12.95" />
      <path d="M25.11 40.58C35.05 38.37 41.68 27.32 40.58 12.95" />
      <path d="M16.15 37.37q-4.42 1.11 -6.63 -3.32q3.32 -4.42 6.63 3.32z" />
      <path d="M11.07 31.29q-4.97 0 -6.63 -4.97q4.42 -2.76 6.63 4.97z" />
      <path d="M7.97 23.01q-4.97 -1.66 -4.97 -6.63q4.97 0 4.97 6.63z" />
      <path d="M7.42 15.71q-3.32 -3.87 -1.11 -8.29q4.42 2.76 1.11 8.29z" />
      <path d="M31.85 37.37q4.42 1.11 6.63 -3.32q-3.32 -4.42 -6.63 3.32z" />
      <path d="M36.93 31.29q4.97 0 6.63 -4.97q-4.42 -2.76 -6.63 4.97z" />
      <path d="M40.03 23.01q4.97 -1.66 4.97 -6.63q-4.97 0 -4.97 6.63z" />
      <path d="M40.58 15.71q3.32 -3.87 1.11 -8.29q-4.42 2.76 -1.11 8.29z" />
      <path d="M16.15 37.37q0 -4.97 4.42 -6.63q1.66 4.42 -4.42 6.63z" />
      <path d="M11.07 31.29q-0.55 -4.97 3.87 -7.18q2.21 4.42 -3.87 7.18z" />
      <path d="M7.97 23.01q-0.55 -4.97 3.32 -7.74q2.76 3.87 -3.32 7.74z" />
      <path d="M31.85 37.37q0 -4.97 -4.42 -6.63q-1.66 4.42 4.42 6.63z" />
      <path d="M36.93 31.29q0.55 -4.97 -3.87 -7.18q-2.21 4.42 3.87 7.18z" />
      <path d="M40.03 23.01q0.55 -4.97 -3.32 -7.74q-2.76 3.87 3.32 7.74z" />
      <path d="M24 10.52L25.88 15.16h4.86l-3.87 2.98 1.44 4.75L24 20.02l-4.31 2.87 1.44 -4.75L17.26 15.16h4.86z" />
    </IconBase>
  );
}

/** Ribboned medal with a star — years of experience. */
export function MedalIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M12.42 4h8.42l4.74 10.53 -6.84 6.84z" />
      <path d="M35.58 4h-8.42l-4.74 10.53 6.84 6.84z" />
      <circle cx="24" cy="32.42" r="11.58" />
      <path d="M24 26.63L25.47 30.42 29.47 30.63 26.42 33.16 27.37 37.16 24 34.95 20.63 37.16 21.58 33.16 18.53 30.63 22.53 30.42z" />
    </IconBase>
  );
}

/** Saloon side profile with glasshouse, doors and wheel arches — vehicles serviced. */
export function CarIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 30.68V26.3c0 -1.86 0.88 -3.06 2.19 -3.5l11.27 -1.75c1.09 -0.11 1.86 -0.66 2.52 -1.53l5.25 -6.13c0.77 -0.77 1.64 -1.09 2.74 -1.09h7c1.31 0 2.19 0.33 3.06 1.31l5.36 5.8 3.5 0.88c1.09 0.22 1.75 1.09 1.75 2.41v6.24c0 0.99 -0.55 1.75 -1.64 1.75h-2.3a5.69 5.69 0 0 0 -11.38 0H17.65a5.69 5.69 0 0 0 -11.38 0z" />
      <circle cx="11.96" cy="30.68" r="5.03" />
      <circle cx="36.15" cy="30.68" r="5.03" />
      <circle cx="11.96" cy="30.68" r="1.86" />
      <circle cx="36.15" cy="30.68" r="1.86" />
      <path d="M19.29 19.73l4.6 -5.58h5.25v5.58zM30.9 19.73v-5.58h2.85c0.99 0 1.86 0.55 2.52 1.31l3.72 4.27z" />
      <path d="M30.02 20.72v7.77" />
      <path d="M22.58 23.23h2.85M32.87 23.23h2.85" />
      <path d="M18.42 18.31l-2.08 1.42H18.42z" />
      <path d="M2.88 25.31h3.5M46 23.23h-2.96" />
    </IconBase>
  );
}

/** Vented brake disc with caliper — genuine parts. */
export function BrakeDiscIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M39.61 20.05A17.83 17.83 0 1 1 23.43 8.33" />
      <circle cx="22.79" cy="26.17" r="7.01" />
      <circle cx="22.79" cy="15.97" r="1.66" />
      <circle cx="32.47" cy="22.98" r="1.66" />
      <circle cx="28.78" cy="34.45" r="1.66" />
      <circle cx="16.8" cy="34.45" r="1.66" />
      <circle cx="13.11" cy="22.98" r="1.66" />
      <path d="M24.7 4A22.29 22.29 0 0 1 43.04 16.74L36.04 19.92A14.65 14.65 0 0 0 24.06 11.52z" />
    </IconBase>
  );
}

/** Laptop with a live trace — XENTRY diagnostics. */
export function DiagnosticsIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.29 9.33h31.43a2.1 2.1 0 0 1 2.1 2.1v18.86H6.19V11.43a2.1 2.1 0 0 1 2.1 -2.1z" />
      <path d="M2 33.43h44v2.1a3.14 3.14 0 0 1 -3.14 3.14H5.14a3.14 3.14 0 0 1 -3.14 -3.14z" />
      <path d="M10.38 21.9h6.29l3.14 -7.33 4.19 14.67 4.19 -11.52 3.14 4.19h6.29" />
    </IconBase>
  );
}

/** Certificate with a ribboned seal — factory training. */
export function CertificateIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.9 4h38.21v31.04H4.9z" />
      <path d="M12.06 12.36h23.88M12.06 18.33h16.72M12.06 24.3h10.75" />
      <circle cx="35.94" cy="30.27" r="4.78" />
      <path d="M33.55 34.45l-2.39 9.55M38.33 34.45l2.39 9.55" />
    </IconBase>
  );
}

/** Shield with a tick — warranty. */
export function ShieldCheckIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M24 4l16.22 5.41v12.97c0 9.73 -7.03 17.84 -16.22 21.62C14.81 40.22 7.78 32.11 7.78 22.38V9.41z" />
      <path d="M16.43 23.46l5.41 5.41 9.73 -10.81" />
    </IconBase>
  );
}

/** Enclosed (closed-box) recovery truck — collection & delivery. */
export function RecoveryTruckIcon(props: TrustIconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 31.7V19.6c0 -1.32 0.88 -2.2 2.2 -2.2h8.8v14.3" />
      <path d="M4.75 20.15h5.5v5.5h-5.5z" />
      <path d="M5.85 17.4v-1.98h4.4V17.4" />
      <path d="M13 31.7V8.6h33v23.1" />
      <path d="M13 12.45h33M13 27.3h33" />
      <path d="M43.25 12.45v14.85M44.46 19.05v2.75" />
      <path d="M2 31.7h44v3.85h-3.85M2 31.7v3.85h2.75M12.45 35.55h22" />
      <circle cx="8.6" cy="35.55" r="3.85" />
      <circle cx="38.3" cy="35.55" r="3.85" />
    </IconBase>
  );
}
