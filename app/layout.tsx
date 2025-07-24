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

        {/* Production-Ready Contact Tracking */}
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
                    console.log('✅ GA4 ready after', attempts, 'attempts');
                    callback();
                  } else if (attempts < maxAttempts) {
                    setTimeout(checkGA4, 500);
                  } else {
                    console.error('❌ GA4 failed to initialize after', maxAttempts, 'attempts');
                  }
                };
                checkGA4();
              }
              
              // Enhanced tracking functions
              function trackPhoneCall() {
                console.log('🎯 TRACKING: Phone call clicked');
                
                // Send to GA4 directly
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'phone_call', {
                    event_category: 'contact',
                    event_label: 'phone_click',
                    value: 1
                  });
                  console.log('✅ Phone event → GA4');
                } else {
                  console.error('❌ gtag not available for phone tracking');
                }
                
                // Send to GTM dataLayer
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: 'phone_call',
                    event_category: 'contact',
                    event_label: 'phone_click',
                    value: 1,
                    timestamp: new Date().toISOString()
                  });
                  console.log('✅ Phone event → GTM dataLayer');
                } else {
                  console.error('❌ dataLayer not available for phone tracking');
                }
              }
              
              function trackWhatsAppClick() {
                console.log('🎯 TRACKING: WhatsApp clicked');
                
                // Send to GA4 directly
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'whatsapp_click', {
                    event_category: 'contact',
                    event_label: 'whatsapp_click',
                    value: 1
                  });
                  console.log('✅ WhatsApp event → GA4');
                } else {
                  console.error('❌ gtag not available for WhatsApp tracking');
                }
                
                // Send to GTM dataLayer
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: 'whatsapp_click',
                    event_category: 'contact',
                    event_label: 'whatsapp_click',
                    value: 1,
                    timestamp: new Date().toISOString()
                  });
                  console.log('✅ WhatsApp event → GTM dataLayer');
                } else {
                  console.error('❌ dataLayer not available for WhatsApp tracking');
                }
              }
              
              // Debug button for production testing
              function addProductionDebugButton() {
                const debugBtn = document.createElement('button');
                debugBtn.innerHTML = '🧪 Test Events';
                debugBtn.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; background: #28a745; color: white; border: none; padding: 8px 12px; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 11px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);';
                
                debugBtn.onclick = function() {
                  console.log('🧪 MANUAL TEST: Sending test events...');
                  trackPhoneCall();
                  setTimeout(() => trackWhatsAppClick(), 1000);
                  
                  // Show status
                  debugBtn.innerHTML = '✅ Events Sent';
                  debugBtn.style.background = '#007bff';
                  setTimeout(() => {
                    debugBtn.innerHTML = '🧪 Test Events';
                    debugBtn.style.background = '#28a745';
                  }, 3000);
                };
                
                document.body.appendChild(debugBtn);
                console.log('🧪 Production debug button added');
              }
              
              // Initialize contact tracking
              function initContactTracking() {
                console.log('🚀 Initializing contact tracking...');
                
                // WhatsApp prefilled message
                const whatsappMessage = encodeURIComponent("Hi Team SilberArrows, I would like to get my Mercedes-Benz serviced!");
                
                // Find and enhance phone links
                const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
                phoneLinks.forEach((link, index) => {
                  link.removeEventListener('click', trackPhoneCall);
                  link.addEventListener('click', function(e) {
                    console.log('📞 Phone link #' + (index + 1) + ' clicked: ' + link.href);
                    trackPhoneCall();
                  });
                });
                
                // Find and enhance WhatsApp links
                const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"], a[href*="api.whatsapp"]');
                whatsappLinks.forEach((link, index) => {
                  // Update href with prefilled message
                  const currentHref = link.getAttribute('href');
                  if (currentHref && currentHref.includes('wa.me')) {
                    const phoneNumber = currentHref.match(/wa\\.me\\/([0-9]+)/);
                    if (phoneNumber) {
                      const newHref = 'https://wa.me/' + phoneNumber[1] + '?text=' + whatsappMessage;
                      link.setAttribute('href', newHref);
                      console.log('💬 WhatsApp link #' + (index + 1) + ' updated with prefilled message');
                    }
                  }
                  
                  link.removeEventListener('click', trackWhatsAppClick);
                  link.addEventListener('click', function(e) {
                    console.log('💬 WhatsApp link #' + (index + 1) + ' clicked: ' + link.href);
                    trackWhatsAppClick();
                  });
                });
                
                console.log('✅ Contact tracking active:', {
                  phoneLinks: phoneLinks.length,
                  whatsappLinks: whatsappLinks.length,
                  domain: window.location.hostname
                });
                
                // Add debug button
                addProductionDebugButton();
              }
              
              // Initialize when GA4 is ready
              waitForGA4(() => {
                // Initialize tracking
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', initContactTracking);
                } else {
                  initContactTracking();
                }
                
                // Re-initialize on navigation
                let lastUrl = location.href;
                new MutationObserver(() => {
                  const url = location.href;
                  if (url !== lastUrl) {
                    lastUrl = url;
                    console.log('🔄 Navigation detected, reinitializing...');
                    setTimeout(initContactTracking, 200);
                  }
                }).observe(document, { subtree: true, childList: true });
              });
              
              // Global debug functions
              window.debugTracking = {
                testPhone: trackPhoneCall,
                testWhatsApp: trackWhatsAppClick,
                reinit: initContactTracking,
                status: function() {
                  console.log('📊 Tracking Status:', {
                    gtag: typeof gtag !== 'undefined' ? '✅ Available' : '❌ Missing',
                    dataLayer: window.dataLayer ? '✅ Available' : '❌ Missing',
                    phoneLinks: document.querySelectorAll('a[href^="tel:"]').length,
                    whatsappLinks: document.querySelectorAll('a[href*="wa.me"]').length
                  });
                }
              };
              
              console.log('🎯 Production tracking loaded! Check GA4 DebugView for events.');
            `,
          }}
        />
      </body>
    </html>
  );
}
