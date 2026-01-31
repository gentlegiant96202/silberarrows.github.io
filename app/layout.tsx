import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import SmoothScrollProvider from '../components/SmoothScrollProvider';

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
        
        {/* Critical CSS - Inline for instant hero paint */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face{font-family:'SilberImpact';src:url('/assets/fonts/impact.ttf') format('truetype');font-weight:normal;font-style:normal;font-display:swap}
          @font-face{font-family:'Montserrat';font-style:normal;font-weight:300;src:url('/assets/fonts/Montserrat-Light.woff2') format('woff2');font-display:swap}
          @font-face{font-family:'Montserrat';font-style:normal;font-weight:400;src:url('/assets/fonts/Montserrat-Regular.woff2') format('woff2');font-display:swap}
          :root{--gold:#E5E5E5;--light:#f8f8f8;--dark:#000;--silver:#C0C0C0;--light-gray:#e0e0e0;--impact-font:'SilberImpact','Arial Black',sans-serif}
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:'Montserrat',sans-serif;background:#000;color:#f8f8f8;overflow-x:hidden}
          .hero{position:relative;display:flex;align-items:flex-start;width:92%;margin:10px auto;padding:80px 4% 60px;background:linear-gradient(135deg,#1a1a1a,#0a0a0a);border-radius:12px;min-height:70vh;overflow:hidden}
          .hero::before{content:"";position:absolute;top:0;right:0;width:55%;height:120%;background:linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.35)),url('/assets/images/hero-bg-silver-optimized.avif') no-repeat center 30%/cover;clip-path:polygon(25% 0%,100% 0%,100% 100%,0% 100%);opacity:.95}
          .hero-content{max-width:650px;position:relative;z-index:2;padding-top:0;margin-top:-10px}
          .hero-logo{margin-bottom:20px}
          .hero-logo-img{height:90px;width:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}
          .hero-tagline{color:var(--silver);font-size:16px;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;white-space:nowrap;font-weight:600}
          .hero-title{font-family:var(--impact-font);font-size:72px;font-weight:400;line-height:.9;margin-bottom:15px;color:var(--light);text-transform:uppercase;letter-spacing:2px;text-shadow:2px 2px 4px rgba(0,0,0,.8)}
          .hero-subtitle{max-width:600px;margin-bottom:22px;color:var(--light-gray);line-height:1.4}
          .hero-cta-container{position:relative}
          .hero-cta{font-family:var(--impact-font);display:inline-flex;flex-direction:column;align-items:center;padding:14px 36px;background:linear-gradient(135deg,#e5e7eb,#f3f4f6,#9ca3af);color:#000;font-size:15px;font-weight:400;text-transform:uppercase;letter-spacing:3px;border-radius:4px;text-decoration:none;cursor:pointer;position:relative;overflow:hidden;transition:all .3s ease;border:none}
          .hero-trust-badge{display:flex;align-items:center;gap:10px;margin-top:15px;padding:12px 20px;background:rgba(255,255,255,.08);backdrop-filter:blur(16px);border-radius:4px;border:1px solid rgba(255,255,255,.15);box-shadow:0 4px 20px rgba(0,0,0,.3);text-decoration:none;color:var(--light);transition:all .3s ease}
          @media(max-width:768px){.hero{width:100%;margin:0;border-radius:0;padding:50px 5% 50px;min-height:65vh}.hero::before{width:100%;height:100%;clip-path:none;opacity:.4}.hero-content{max-width:700px;text-align:center;margin:0 auto;margin-top:-30px}.hero-logo{margin-bottom:15px}.hero-logo-img{height:80px}.hero-title{font-size:56px}.hero-tagline{font-size:15px}.hero-subtitle{font-size:14px}.hero-cta-container{justify-content:center}.hero-trust-badge{margin:12px auto 0}}
          @media(max-width:480px){.hero{padding:40px 5% 50px;min-height:60vh}.hero-content{max-width:90%;margin-top:-20px}.hero-logo{margin-bottom:12px}.hero-logo-img{height:65px}.hero-tagline{white-space:normal;font-size:12px}.hero-title{font-size:34px}.hero-subtitle{font-size:14px}.hero-cta{margin:0 auto}.hero-trust-badge{margin:12px auto 0}}
        `}} />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/images/hero-bg-silver-optimized.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/fonts/impact.ttf" as="font" type="font/ttf" crossOrigin="" />
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
