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
  // Optional: different badges or CTAs per landing page
  badges?: { icon: string; text: string }[];
}

export const landingPages: Record<string, LandingPageConfig> = {
  'mercedes-service': {
    slug: 'mercedes-service',
    tagline: 'Trusted Mercedes Specialists in Dubai',
    title: [
      'Mercedes-Benz',
      'Service in Dubai'
    ],
    highlightLine: 0,  // Highlight "Mercedes-Benz"
    subtitle: [
      'Expert Mercedes service by certified technicians.',
      'Genuine parts, competitive prices,',
      'trusted by Dubai\'s Mercedes owners.'
    ],
    metaTitle: 'Mercedes Service Dubai | Expert Mercedes-Benz Service',
    metaDescription: 'Professional Mercedes service in Dubai. Certified technicians, genuine parts, competitive prices. Trusted by 10,000+ Mercedes owners. Free collection & delivery.',
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
