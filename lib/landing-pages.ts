// Landing page configurations for PPC ad groups
export interface LandingPageConfig {
  slug: string;
  // Hero content
  tagline: string;
  title: string[];  // Array of lines for the hero title
  highlightLine: number;  // Which line index to highlight (e.g., "Mercedes-Benz")
  subtitle: string[];  // Array of lines for subtitle
  // Meta tags
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  // Optional: different badges or CTAs per landing page
  badges?: { icon: string; text: string }[];
}

export const landingPages: Record<string, LandingPageConfig> = {
  'mercedes-service': {
    slug: 'mercedes-service',
    tagline: 'Trusted Mercedes-Benz Service Center in Dubai',
    title: [
      'Mercedes-Benz',
      'Service Center',
      'in Dubai'
    ],
    highlightLine: 0,  // Highlight "Mercedes-Benz"
    subtitle: [
      'Your nearest Mercedes service center in Al Quoz.',
      'Book your service appointment today',
      'expert maintenance & car service with genuine parts.'
    ],
    metaTitle: 'Mercedes Service Center Dubai | Expert Mercedes-Benz Service & Maintenance',
    metaDescription: 'Dubai\'s trusted Mercedes-Benz service center near you. Book your Mercedes service appointment today. Expert car service, scheduled maintenance, genuine parts. Free collection & delivery.',
    metaKeywords: 'mercedes service, mercedes benz service, benz service, mercedes service center, mercedes benz service center, benz service center, mb service center, mercedes service near me, mercedes benz service near me, mercedes service center near me, mercedes benz service center near me, mercedes service appointment, mercedes benz appointment, mercedes car service, mercedes benz car service, mercedes maintenance, mercedes benz maintenance, mercedes maintenance near me, mercedes service Dubai, mercedes service Al Quoz',
    badges: [
      { icon: 'shield-alt', text: '12 Month Warranty on Parts & Labour' },
      { icon: 'truck', text: 'Free Collection & Delivery' }
    ]
  }
};

export function getLandingPage(slug: string): LandingPageConfig | undefined {
  return landingPages[slug];
}

export function getAllLandingPageSlugs(): string[] {
  return Object.keys(landingPages);
}
