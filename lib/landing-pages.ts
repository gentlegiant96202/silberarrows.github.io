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
  // AG1: Mercedes Service (General) — keywords: "mercedes service", "benz service", "mercedes car service"
  'mercedes-service': {
    slug: 'mercedes-service',
    tagline: 'Expert Mercedes-Benz Service Specialist in Dubai',
    title: [
      'Mercedes-Benz',
      'Service',
      'in Dubai'
    ],
    highlightLine: 0,
    subtitle: [
      'Service A & B packages with genuine parts.',
      'Save 30 to 40% vs the dealer. AED 375/hr labour rate.',
      'Book your appointment today.'
    ],
    metaTitle: 'Mercedes Service Dubai | Expert Mercedes-Benz Service & Maintenance',
    metaDescription: 'Expert Mercedes-Benz service in Al Quoz, Dubai. Service A & B packages with genuine parts, XENTRY diagnostics & 12-month warranty. AED 375/hr. Free collection & delivery.',
    metaKeywords: 'mercedes service, mercedes benz service, benz service, mercedes car service, mercedes benz car service, mercedes service dubai, mercedes service al quoz, mercedes service appointment, mercedes benz appointment, mb service',
    badges: [
      { icon: 'shield-alt', text: '12 Month Warranty on Parts & Labour' },
      { icon: 'truck', text: 'Free Collection & Delivery' },
      { icon: 'tag', text: 'Service A from AED 1,499' }
    ]
  },
  // AG2: Mercedes Service Center — keywords: "mercedes service center", "benz service center"
  'mercedes-service-center': {
    slug: 'mercedes-service-center',
    tagline: 'Trusted Mercedes-Benz Service Center in Dubai',
    title: [
      'Mercedes-Benz',
      'Service Center',
      'in Dubai'
    ],
    highlightLine: 0,
    subtitle: [
      'Full-service Mercedes-Benz center in Al Quoz.',
      'Factory-trained technicians, XENTRY diagnostics',
      'and genuine parts. Open Mon–Sat.'
    ],
    metaTitle: 'Mercedes Service Center Dubai | Mercedes-Benz Service Center Al Quoz',
    metaDescription: 'Dubai\'s trusted Mercedes-Benz service center in Al Quoz. Factory-trained technicians, genuine parts, XENTRY diagnostics. 12-month warranty. Free collection & delivery. Book now.',
    metaKeywords: 'mercedes service center, mercedes benz service center, benz service center, mercedes service center dubai, mercedes service center al quoz, mercedes benz service center near me, benz service center near me',
    badges: [
      { icon: 'shield-alt', text: '12 Month Warranty on Parts & Labour' },
      { icon: 'truck', text: 'Free Collection & Delivery' }
    ]
  },
  'service-packages': {
    slug: 'service-packages',
    tagline: 'Mercedes-Benz Scheduled Maintenance Packages',
    title: [
      'Mercedes-Benz',
      'Service Packages',
      'in Dubai'
    ],
    highlightLine: 0,
    subtitle: [
      'Service A, Service B & B1–B7 maintenance packages.',
      'Genuine parts, competitive pricing',
      'and expert Mercedes technicians.'
    ],
    metaTitle: 'Mercedes Service A & B Packages Dubai | B1 B3 B5 B7 Maintenance Cost',
    metaDescription: 'Mercedes-Benz Service A, Service B, B1, B3, B5 & B7 maintenance packages in Dubai. Competitive pricing with genuine parts. Book your scheduled service today.',
    metaKeywords: 'mercedes service a, service a mercedes benz, mb service a, benz service a, service a1 mercedes, mercedes service a cost, mercedes benz service a cost, benz service a cost, mercedes service b, service b mercedes benz, mb service b, benz service b, mercedes a and b service, mercedes benz service a and b, service a service b mercedes, mercedes service b cost, mercedes benz service b cost, mercedes b1 service, mercedes benz b1 service, mercedes b1 service cost, mercedes b3 service, mercedes benz b3 service, service b5 mercedes, mercedes benz service b7, b7 service mercedes, service a7 mercedes cost, service a5 mercedes cost, service b3 mercedes cost, w212 service b, w204 service a, service b mercedes c class',
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
