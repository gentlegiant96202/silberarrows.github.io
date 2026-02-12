import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import fs from 'fs';
import path from 'path';
import SmoothScrollProvider from '../components/SmoothScrollProvider';

const inlineCss = fs.readFileSync(path.join(process.cwd(), 'app/globals.css'), 'utf8');

export const metadata: Metadata = {
  title: 'SilberArrows | Mercedes-Benz Service Center Dubai',
  description: 'Dubai\'s trusted independent Mercedes-Benz specialists. Expert service, maintenance & repair in Al Quoz. Professional diagnostics, genuine parts, factory standards since 2011.',
  keywords: 'Mercedes-Benz service Dubai, Mercedes repair Dubai, independent Mercedes service, Mercedes maintenance Al Quoz, SilberArrows, Mercedes specialist Dubai',
  authors: [{ name: 'SilberArrows' }],
  creator: 'SilberArrows',
  publisher: 'SilberArrows',
  robots: 'index, follow',
  openGraph: {
    title: 'SilberArrows | Premier Mercedes-Benz Service Center Dubai',
    description: 'Dubai\'s trusted independent Mercedes-Benz specialists in Al Quoz. Expert service, maintenance & repair with genuine parts.',
    url: 'https://mercedes-benz.silberarrows.com',
    siteName: 'SilberArrows',
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SilberArrows | Premier Mercedes-Benz Service Center Dubai',
    description: 'Dubai\'s trusted independent Mercedes-Benz specialists in Al Quoz.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Viewport for mobile compatibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        
        {/* Inline full stylesheet to eliminate render blocking */}
        <style dangerouslySetInnerHTML={{ __html: inlineCss }} />
        
        {/* Preload critical resources */}
        {/* Desktop: hero background image */}
        <link rel="preload" href="/assets/images/hero-bg-silver-optimized.avif" as="image" fetchPriority="high" media="(min-width: 769px)" />
        {/* Mobile: Why Choose Us image (LCP element on mobile) */}
        <link rel="preload" href="/assets/images/why-choose-us-bg-mobile.avif" as="image" fetchPriority="high" media="(max-width: 768px)" />
        <link rel="preload" href="/assets/fonts/Anton-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Light.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* Google Analytics 4 - Deferred to after page load for better LCP/TBT */}
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
              
              // Initialize GA4
              gtag('js', new Date());
              gtag('config', 'G-GK0X6327FK', {
                send_page_view: true
              });
            `,
          }}
        />
        
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
