import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Silver Arrows | Premium Mercedes-Benz Service Center Dubai',
  description: 'Dubai\'s premier independent Mercedes-Benz service center. Expert maintenance, repair, and diagnostics exclusively for Mercedes-Benz vehicles since 2011.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/images/hero-bg-silver-optimized.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/fonts/impact.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Light.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        {children}
        {/* JavaScript */}
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
