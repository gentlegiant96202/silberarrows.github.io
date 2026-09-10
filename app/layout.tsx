import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileContactBar } from "@/components/MobileContactBar";
import { ContactModalProvider } from "@/components/ContactModalProvider";
import { ChromeGate } from "@/components/ChromeGate";
import { site } from "@/lib/site";
import { defaultOgImage } from "@/lib/seo";
import "./globals.css";

// Mercedes-Benz Corporate S — body, UI, mid-size headings.
// Regular (400) + Bold (700); CSS 500 maps down to Regular, 600 up to Bold.
const corpoS = localFont({
  src: [
    { path: "./fonts/CorpoS-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/CorpoS-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-corpo-s",
  display: "swap",
});

// Mercedes-Benz Corporate A — display headlines (hero, section titles).
const corpoA = localFont({
  src: [
    { path: "./fonts/CorpoA-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/CorpoA-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-corpo-a",
  display: "swap",
});

// Arabic face for the /ar routes. Registered here (on <html>) so the
// `--font-arabic` theme token resolves at :root; `preload: false` means
// English pages only ship the @font-face rule — the files download on first
// use, i.e. only when an /ar page actually renders Arabic text.
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
  preload: false,
});

const siteUrl = site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SilberArrows | Mercedes-Benz Service Center Dubai",
    template: "%s",
  },
  description:
    "Dubai's trusted independent Mercedes-Benz specialists. Expert service, maintenance & repair in Al Quoz. Professional diagnostics, genuine parts, factory standards since 2011.",
  applicationName: "SilberArrows",
  authors: [{ name: "SilberArrows", url: siteUrl }],
  creator: "SilberArrows",
  publisher: "SilberArrows",
  category: "automotive",
  formatDetection: { telephone: true, address: true, email: true },
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteUrl,
    siteName: "SilberArrows",
    title: "SilberArrows | Premier Mercedes-Benz Service Center Dubai",
    description:
      "Dubai's trusted independent Mercedes-Benz specialists in Al Quoz. Expert service, maintenance & repair with genuine parts.",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "SilberArrows | Premier Mercedes-Benz Service Center Dubai",
    description:
      "Dubai's trusted independent Mercedes-Benz specialists in Al Quoz.",
    images: [defaultOgImage.url],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <html lang="en-AE" className={`${corpoS.variable} ${corpoA.variable} ${ibmPlexArabic.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <Script
          id="legacy-sw-cleanup"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
                navigator.serviceWorker.getRegistrations().then(function(regs){
                  regs.forEach(function(r){ r.unregister(); });
                }).catch(function(){});
                if (typeof caches !== 'undefined') {
                  caches.keys().then(function(keys){
                    keys.forEach(function(k){ caches.delete(k); });
                  }).catch(function(){});
                }
              })();
            `,
          }}
        />
        {/*
          gtag stub + config, defined BEFORE hydration. The gtag.js library
          itself still loads lazily (below), but window.gtag exists from the
          first paint, so conversion events fired by early clicks (e.g. the
          sticky mobile Call/WhatsApp bar) queue in dataLayer instead of being
          dropped, and are flushed when the library arrives. Config commands
          are queued first so events that follow have a configured send_to.
          Also captures Google click IDs (gclid / gbraid / wbraid) into
          first-party cookies for lead attribution.
        */}
        <Script
          id="gtag-stub"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', 'G-GK0X6327FK', { send_page_view: true });
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
              (function(){
                try {
                  var q = window.location.search;
                  ['gclid','gbraid','wbraid'].forEach(function(k){
                    var m = q.match(new RegExp('[?&]' + k + '=([^&]+)'));
                    if (m) document.cookie = '_' + k + '=' + m[1] + ';max-age=7776000;path=/;SameSite=Lax';
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-spotlight font-sans antialiased text-[color:var(--color-silver-100)] pb-[calc(env(safe-area-inset-bottom)+5rem)] lg:pb-0">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCW6K7CB"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- Meta Pixel noscript fallback per Facebook */}
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=941983558202599&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <ContactModalProvider>
          <ChromeGate>
            <Header />
          </ChromeGate>
          <main>{children}</main>
          <ChromeGate>
            <Footer />
            <MobileContactBar />
          </ChromeGate>
        </ContactModalProvider>

        {/* gtag.js library — config + stub are queued in <head> (gtag-stub). */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GK0X6327FK"
          strategy="lazyOnload"
        />
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '941983558202599');
              fbq('track', 'PageView');
            `,
          }}
        />
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WCW6K7CB');
            `,
          }}
        />
      </body>
    </html>
  );
}
