import type { Metadata } from "next";

// Internal tool — keep it out of every index and cache.
export const metadata: Metadata = {
  title: "Ads Dashboard — SilberArrows",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#070708] text-silver-100">{children}</div>;
}
