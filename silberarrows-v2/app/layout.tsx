import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactModalProvider } from "@/components/ContactModalProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://mercedes-benz.silberarrows.com"),
  title: {
    default: "SilberArrows | Mercedes-Benz Service Center Dubai",
    template: "%s",
  },
  description:
    "Dubai's trusted independent Mercedes-Benz specialists. Expert service, maintenance & repair in Al Quoz. Professional diagnostics, genuine parts, factory standards since 2011.",
  keywords:
    "Mercedes-Benz service Dubai, Mercedes repair Dubai, independent Mercedes service, Mercedes maintenance Al Quoz, SilberArrows, Mercedes specialist Dubai",
  authors: [{ name: "SilberArrows" }],
  creator: "SilberArrows",
  publisher: "SilberArrows",
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://mercedes-benz.silberarrows.com",
    siteName: "SilberArrows",
    title: "SilberArrows | Premier Mercedes-Benz Service Center Dubai",
    description:
      "Dubai's trusted independent Mercedes-Benz specialists in Al Quoz. Expert service, maintenance & repair with genuine parts.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SilberArrows | Premier Mercedes-Benz Service Center Dubai",
    description:
      "Dubai's trusted independent Mercedes-Benz specialists in Al Quoz.",
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
  return (
    <html lang="en">
      <body className="bg-spotlight font-sans antialiased text-[color:var(--color-silver-100)]">
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
          <Header />
          <main>{children}</main>
          <Footer />
        </ContactModalProvider>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GK0X6327FK"
          strategy="lazyOnload"
        />
        <Script
          id="ga4-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GK0X6327FK', {
                send_page_view: true
              });
            `,
          }}
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
        <Script
          id="gclid-capture"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var m=window.location.search.match(/[?&]gclid=([^&]+)/);
                if(m)document.cookie='_gclid='+m[1]+';max-age=7776000;path=/;SameSite=Lax';
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
