import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '../components/SmoothScrollProvider'

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
