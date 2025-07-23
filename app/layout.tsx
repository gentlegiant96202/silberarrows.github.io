import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '../components/SmoothScrollProvider'

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
        {/* Viewport for mobile compatibility */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/images/hero-bg-silver-optimized.avif" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/fonts/impact.ttf" as="font" type="font/ttf" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/Montserrat-Light.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
