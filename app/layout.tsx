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
        <link rel="preload" href="/assets/images/hero-bg-silver-optimized.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/fonts/Anton-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Light.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* Google Analytics 4 - Direct Implementation */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GK0X6327FK"
          strategy="afterInteractive"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Initialize GA4 with debug mode enabled
              gtag('js', new Date());
              gtag('config', 'G-GK0X6327FK', {
                debug_mode: true,
                send_page_view: true
              });
              
              console.log('🎯 GA4 initialized with debug mode');
            `,
          }}
        />
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize GTM
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WCW6K7CB');
              
              console.log('🎯 GTM initialized');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WCW6K7CB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <SpeedInsights />

        {/* Production Contact Tracking */}
        <Script
          id="contact-tracking-production"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Wait for GA4 to be ready
              function waitForGA4(callback, maxAttempts = 20) {
                let attempts = 0;
                const checkGA4 = () => {
                  attempts++;
                  if (typeof gtag !== 'undefined' && window.dataLayer) {
                    callback();
                  } else if (attempts < maxAttempts) {
                    setTimeout(checkGA4, 500);
                  }
                };
                checkGA4();
              }
              
              // Tracking functions
              function trackPhoneCall() {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'phone_call', {
                    event_category: 'engagement',
                    event_label: 'contact_method',
                    value: 1
                  });
                }
                
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: 'phone_call',
                    event_category: 'engagement',
                    event_label: 'contact_method',
                    value: 1
                  });
                }
              }
              
              function trackWhatsAppClick() {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'whatsapp_click', {
                    event_category: 'engagement', 
                    event_label: 'contact_method',
                    value: 1
                  });
                }
                
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: 'whatsapp_click',
                    event_category: 'engagement',
                    event_label: 'contact_method', 
                    value: 1
                  });
                }
              }
              
              // Initialize tracking when GA4 is ready
              waitForGA4(() => {
                // Find and enhance phone links
                const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
                phoneLinks.forEach((link) => {
                  link.addEventListener('click', trackPhoneCall);
                });
                
                // Find and enhance WhatsApp links
                const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
                whatsappLinks.forEach((link) => {
                  // Update href with prefilled message if needed
                  if (!link.href.includes('text=')) {
                    const prefillMessage = encodeURIComponent('Hi Team SilberArrows, I would like to get my Mercedes-Benz serviced!');
                    const separator = link.href.includes('?') ? '&' : '?';
                    link.href = link.href + separator + 'text=' + prefillMessage;
                  }
                  
                  link.addEventListener('click', trackWhatsAppClick);
                });
              });
              
              // Re-initialize on navigation changes (SPA behavior)
              let currentUrl = window.location.href;
              const observer = new MutationObserver(() => {
                if (window.location.href !== currentUrl) {
                  currentUrl = window.location.href;
                  setTimeout(() => waitForGA4(() => {
                    // Re-run tracking setup for new page content
                    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
                    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
                    phoneLinks.forEach(link => link.addEventListener('click', trackPhoneCall));
                    whatsappLinks.forEach(link => {
                      if (!link.href.includes('text=')) {
                        const prefillMessage = encodeURIComponent('Hi Team SilberArrows, I would like to get my Mercedes-Benz serviced!');
                        const separator = link.href.includes('?') ? '&' : '?';
                        link.href = link.href + separator + 'text=' + prefillMessage;
                      }
                      link.addEventListener('click', trackWhatsAppClick);
                    });
                  }), 1000);
                }
              });
              observer.observe(document.body, { childList: true, subtree: true });
            `
          }}
        />
      </body>
    </html>
  );
}
