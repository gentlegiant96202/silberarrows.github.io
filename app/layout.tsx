import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import SmoothScrollProvider from '../components/SmoothScrollProvider';

export const metadata: Metadata = {
  title: 'SilberArrows | Premier Mercedes-Benz Service Center Dubai | Al Quoz',
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
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/images/hero-bg-silver-optimized.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/fonts/impact.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Light.woff2" as="font" type="font/woff2" crossOrigin="" />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Default consent settings (GDPR compliance)
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
              
              // Initialize GTM
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WCW6K7CB');
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

        {/* Contact Tracking Script */}
        <Script
          id="contact-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Contact tracking functions
              function trackPhoneCall() {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'phone_call', {
                    event_category: 'contact',
                    event_label: 'phone_click',
                    value: 1
                  });
                  console.log('📞 Phone call tracked');
                }
              }
              
              function trackWhatsAppClick() {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'whatsapp_click', {
                    event_category: 'contact',
                    event_label: 'whatsapp_click',
                    value: 1
                  });
                  console.log('💬 WhatsApp click tracked');
                }
              }
              
              // Add tracking to existing links when page loads
              function initContactTracking() {
                // WhatsApp prefilled message
                const whatsappMessage = encodeURIComponent("Hi Team SilberArrows, I would like to get my Mercedes-Benz serviced!");
                
                // Find all phone links
                const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
                phoneLinks.forEach(link => {
                  link.addEventListener('click', trackPhoneCall);
                });
                
                // Find all WhatsApp links and update with prefilled message
                const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
                whatsappLinks.forEach(link => {
                  // Update href with prefilled message
                  const currentHref = link.getAttribute('href');
                  if (currentHref && currentHref.includes('wa.me')) {
                    const newHref = currentHref.includes('?') 
                      ? currentHref + '&text=' + whatsappMessage
                      : currentHref + '?text=' + whatsappMessage;
                    link.setAttribute('href', newHref);
                  }
                  
                  // Add click tracking
                  link.addEventListener('click', trackWhatsAppClick);
                });
                
                console.log('✅ Contact tracking initialized:', {
                  phoneLinks: phoneLinks.length,
                  whatsappLinks: whatsappLinks.length
                });
              }
              
              // Initialize when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initContactTracking);
              } else {
                initContactTracking();
              }
              
              // Re-initialize on navigation (for SPA behavior)
              let lastUrl = location.href;
              new MutationObserver(() => {
                const url = location.href;
                if (url !== lastUrl) {
                  lastUrl = url;
                  setTimeout(initContactTracking, 100); // Small delay for DOM updates
                }
              }).observe(document, { subtree: true, childList: true });
            `,
          }}
        />
      </body>
    </html>
  );
}
