import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mercedes-benz.silberarrows.com'
  
  // Define all service slugs that exist (verified from actual service pages)
  const serviceRoutes = [
    'scheduled-maintenance',
    'brake-service',
    'detailing',
    'battery-service',
    'air-conditioning',
    'diagnostics',
    'engine-repair',
    'suspension-repair',
    'tyre-replacement',
    'wheel-alignment'
  ]

  // Core pages with high priority
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service-contracts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Individual service pages with medium-high priority
  const servicePages: MetadataRoute.Sitemap = serviceRoutes.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...corePages,
    ...servicePages,
  ]
} 