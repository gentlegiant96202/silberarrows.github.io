export const team = [
  {
    name: "Michael Riley",
    role: "Service Team Leader",
    cert: "Certified Mercedes-Benz Technician",
    bio: "Leads our workshop team with a focus on quality, safety, and consistent Mercedes-Benz standards.",
    initials: "MR",
    image: "/assets/images/team-michael-riley.png",
    imageFocus: "center 35%",
  },
  {
    name: "Maroua Dafir",
    role: "Service Team Leader",
    cert: "Certified Mercedes-Benz Technician",
    bio: "Coordinates service operations and supports advisors to deliver a smooth, premium customer experience.",
    initials: "MD",
    image: "/assets/images/team-maroua-dafir.png",
    imageFocus: "center 52%",
  },
  {
    name: "Glen Cable",
    role: "Senior Service Team Leader",
    cert: "Certified Mercedes-Benz Technician",
    bio: "Brings senior leadership to the floor, mentoring technicians and upholding factory-level workmanship.",
    initials: "GC",
    image: "/assets/images/team-glen-cable.png",
    imageFocus: "center 35%",
  },
];

export const whyChooseUs = [
  {
    title: "Genuine Parts & Factory Standards",
    body: "Only genuine Mercedes-Benz parts, fitted using manufacturer-approved tools and procedures.",
  },
  {
    title: "Exclusive to Mercedes-Benz",
    body: "We work on one marque only, Mercedes-Benz. That's where our expertise lies.",
  },
  {
    title: "Factory-Trained Technicians",
    body: "Certified technicians trained to Mercedes-Benz standards with over seven decades of combined hands-on experience.",
  },
  {
    title: "Service Contracts",
    body: "Comprehensive maintenance packages designed to keep your Mercedes-Benz in peak condition with premium care.",
  },
  {
    title: "12-Month Warranty",
    body: "All work is backed by a full 12-month warranty for your peace of mind.",
  },
  {
    title: "Free Collection & Delivery",
    body: "Complimentary vehicle collection and delivery across Dubai.",
  },
];

export const contracts = {
  heading: "Service Contracts For Your Mercedes-Benz",
  sub: "Peace of Mind, Guaranteed",
  plans: [
    {
      name: "Standard",
      description: "Essential maintenance",
      price: "AED 2,700",
      period: "2 Years / 30,000 km",
    },
    {
      name: "Premium",
      description: "Comprehensive coverage package",
      price: "AED 5,800",
      period: "4 Years / 60,000 km",
      featured: true,
    },
  ],
  rows: [
    { feature: "Service A (Minor)", standard: "1x", premium: "2x" },
    { feature: "Service B (Major)", standard: "1x", premium: "2x" },
    { feature: "Brake Fluid Replacement", standard: "1x", premium: "2x" },
    { feature: "Spark Plug Replacement", standard: "\u2014", premium: "\u2713" },
    { feature: "Coolant Replacement", standard: "\u2014", premium: "\u2713" },
    {
      feature: "Transmission Oil Change + Filter Replacement",
      standard: "\u2014",
      premium: "\u2713",
    },
    { feature: "Full Vehicle Inspection", standard: "\u2713", premium: "\u2713" },
  ],
};

/**
 * Homepage teaser for the Extended Warranty programme. Prices are not stored
 * here — the section derives its "Starting from" figures from
 * `lib/serviceWarrantyPricing` so they can never drift from the calculator.
 */
export const warranty = {
  heading: "Extended Warranty For Your Mercedes-Benz",
  sub: "Protection Beyond the Factory Warranty",
  plans: [
    {
      name: "Standard",
      description: "Drivetrain only",
    },
    {
      name: "Premium",
      description: "Comprehensive coverage",
      featured: true,
    },
  ],
};

export const pricing = {
  intro:
    "Part of our customer charter is to ensure that we are transparent \u2013 we charge you an hourly labour rate of AED 375 (excluding Classic, Maybach and the McLaren SLR), which is significantly lower than some of the alternatives.",
  rows: [
    { model: "A / C / CLA / CLE", minor: "AED 1,188", major: "AED 1,620" },
    { model: "CLK", minor: "AED 1,080", major: "AED 1,620" },
    { model: "E / CLS", minor: "AED 1,188", major: "AED 1,800" },
    { model: "S / CL", minor: "AED 1,296", major: "AED 1,944" },
    { model: "G", minor: "AED 1,680", major: "AED 2,640" },
    { model: "GLA / GLB / GLK / GLC", minor: "AED 1,188", major: "AED 1,620" },
    { model: "ML / GLE / GL / GLS", minor: "AED 1,296", major: "AED 1,944" },
    { model: "V", minor: "AED 1,800", major: "AED 2,340" },
    { model: "SLK / SLC", minor: "AED 972", major: "AED 1,920" },
    { model: "SL", minor: "AED 1,296", major: "AED 2,400" },
    { model: "SLS / AMG GT", minor: "AED 2,640", major: "AED 3,360" },
    { model: "SLR", minor: "n/a", major: "AED 7,080" },
    { model: "Maybach", minor: "AED 3,120", major: "AED 3,600" },
  ],
  eq: [
    { model: "EQ A / B / C", minor: "AED 1,188", major: "AED 1,620" },
    { model: "EQ E / S / V / G", minor: "AED 1,440", major: "AED 1,800" },
  ],
  notes: [
    "Prices exclusive of VAT.",
    "Prices depend on engine size (and type); if your model does not feature in this list, please call +971 4 380 5515 for a price.",
    "The operations performed during a Minor and Major Service adhere to the scheduled maintenance guidelines stipulated by Daimler GmbH.",
  ],
};

/**
 * Hero headline model. Each line is a list of segments rendered inline and
 * separated by a single space; a segment can be highlighted (silver gradient).
 * Segments without spaces (e.g. "Mercedes-Benz") never break internally.
 */
export type HeroTitleSegment = { text: string; highlight?: boolean };
export type HeroTitleLine = HeroTitleSegment[];

export const landingPages: Record<
  string,
  {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    tagline: string;
    titleParts: HeroTitleLine[];
    subtitle: string;
    badges: string[];
    relatedServices?: string[];
  }
> = {
  "mercedes-service": {
    metaTitle:
      "Mercedes Service Dubai | Expert Mercedes-Benz Service & Maintenance",
    metaDescription:
      "Expert Mercedes-Benz service in Al Quoz, Dubai. Service A & B packages with genuine parts, XENTRY diagnostics & 12-month warranty.",
    metaKeywords:
      "mercedes service, mercedes benz service, benz service, mercedes car service, mercedes benz car service, mercedes service dubai, mercedes service al quoz, mercedes service appointment, mercedes benz appointment, mb service",
    tagline: "Expert Mercedes-Benz Service Specialist in Dubai",
    titleParts: [
      [{ text: "Mercedes-Benz", highlight: true }],
      [{ text: "Service" }],
      [{ text: "in Dubai" }],
    ],
    subtitle:
      "Service A & B packages with genuine parts. Save 30 to 40% vs the dealer. AED 375/hr labour rate.",
    badges: [
      "12 Month Warranty on Parts & Labour",
      "Free Collection & Delivery",
      "Service A from AED 1,499",
    ],
  },
  "mercedes-service-center": {
    metaTitle:
      "Mercedes Service Center Dubai | Mercedes-Benz Service Center Al Quoz",
    metaDescription:
      "Dubai's trusted Mercedes-Benz service center in Al Quoz. Factory-trained technicians, genuine parts, XENTRY diagnostics.",
    metaKeywords:
      "mercedes service center, mercedes benz service center, benz service center, mercedes service center dubai, mercedes service center al quoz, mercedes benz service center near me, benz service center near me",
    tagline: "Trusted Mercedes-Benz Service Center in Dubai",
    titleParts: [
      [{ text: "Mercedes-Benz", highlight: true }],
      [{ text: "Service Center" }],
      [{ text: "in Dubai" }],
    ],
    subtitle:
      "Full-service Mercedes-Benz center in Al Quoz. Factory-trained technicians, XENTRY diagnostics and genuine parts.",
    badges: [
      "12 Month Warranty on Parts & Labour",
      "Free Collection & Delivery",
    ],
  },
  "mercedes-service-near-me": {
    metaTitle:
      "Mercedes Service Near Me Dubai | Mercedes-Benz Service Al Quoz",
    metaDescription:
      "Mercedes-Benz service near you in Al Quoz, Dubai. Free collection & delivery across Dubai. 12-month warranty, genuine parts.",
    metaKeywords:
      "mercedes service near me, mercedes benz service near me, mercedes service center near me, mercedes benz service center near me, mercedes garage near me, mercedes maintenance near me, mercedes benz near me, benz service center near me, service mercedes benz near me, mercedes benz near me service",
    tagline: "Your Nearest Mercedes-Benz Specialist in Dubai",
    titleParts: [
      [{ text: "Mercedes-Benz", highlight: true }],
      [{ text: "Service" }],
      [{ text: "Near You" }],
    ],
    subtitle:
      "Independent Mercedes specialist in Al Quoz, Dubai. Free collection and delivery across Dubai. Book your service or walk in today.",
    badges: [
      "12 Month Warranty on Parts & Labour",
      "Free Collection & Delivery",
    ],
  },
  "mercedes-repair": {
    metaTitle: "Mercedes Repair Dubai | Expert Mercedes-Benz Repair Al Quoz",
    metaDescription:
      "Expert Mercedes-Benz repair in Al Quoz, Dubai. Engine, gearbox, AC, electrical & suspension. XENTRY diagnostics, genuine parts.",
    metaKeywords:
      "mercedes repair, mercedes benz repair, benz repair, mercedes auto repair, mercedes car repair, mercedes repair near me, mercedes benz repair near me, mercedes repair shop near me, mercedes mechanic near me, mercedes auto shop near me, mercedes repair dubai, mercedes repair al quoz",
    tagline: "Expert Mercedes-Benz Repair Specialists in Dubai",
    titleParts: [
      [{ text: "Mercedes-Benz", highlight: true }],
      [{ text: "Repair Specialists" }],
      [{ text: "in Dubai" }],
    ],
    subtitle:
      "Engine, gearbox, AC, electrical and suspension repair. XENTRY diagnostics, genuine parts and 12 month warranty on all repairs.",
    badges: [
      "12 Month Warranty on Parts & Labour",
      "Free Collection & Delivery",
    ],
    relatedServices: [
      "engine-repair",
      "suspension-repair",
      "diagnostics",
      "air-conditioning",
    ],
  },
  "service-packages": {
    metaTitle:
      "Mercedes Service A & B Packages Dubai | B1 B3 B5 B7 Maintenance Cost",
    metaDescription:
      "Mercedes-Benz Service A, Service B, B1, B3, B5 & B7 maintenance packages in Dubai. Competitive pricing with genuine parts.",
    metaKeywords:
      "mercedes service a, service a mercedes benz, mb service a, benz service a, service a1 mercedes, mercedes service a cost, mercedes benz service a cost, benz service a cost, mercedes service b, service b mercedes benz, mb service b, benz service b, mercedes a and b service, mercedes benz service a and b, service a service b mercedes, mercedes service b cost, mercedes benz service b cost, mercedes b1 service, mercedes benz b1 service, mercedes b1 service cost, mercedes b3 service, mercedes benz b3 service, service b5 mercedes, mercedes benz service b7, b7 service mercedes, service a7 mercedes cost, service a5 mercedes cost, service b3 mercedes cost, w212 service b, w204 service a, service b mercedes c class",
    tagline: "Mercedes-Benz Scheduled Maintenance Packages",
    titleParts: [
      [{ text: "Mercedes-Benz", highlight: true }],
      [{ text: "Service Packages" }],
      [{ text: "in Dubai" }],
    ],
    subtitle:
      "Service A, Service B & B1\u2013B7 maintenance packages. Genuine parts, competitive pricing and expert Mercedes technicians.",
    badges: [
      "12 Month Warranty on Parts & Labour",
      "Free Collection & Delivery",
    ],
  },
};
