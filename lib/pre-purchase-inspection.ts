import type { FAQ } from "@/lib/services";

/**
 * Copy for /services/pre-purchase-inspection, taken word for word from the
 * approved PPI website copy (v5, 2026-10-27). Do not edit wording here
 * without sign-off; the phone/WhatsApp booking lines are replaced by the
 * site's own contact CTAs.
 */

export const PPI_SLUG = "pre-purchase-inspection";

export const ppiReel = {
  src: "/assets/video/ppi-reel-720.mp4",
  poster: "/assets/video/ppi-reel-poster.webp",
};

export const ppiIntro = {
  tagline: "Understand the Mercedes-Benz before you buy it",
  paragraphs: [
    "A Pre-Purchase Inspection (PPI) helps you understand the condition of a used Mercedes-Benz before committing to the purchase. At SilberArrows in Dubai, we assess the vehicle, explain the findings and help you understand the repairs or maintenance you may need to budget for.",
    "Our Mercedes-Benz focus brings together mechanical assessment, physical checks and XENTRY diagnostics for compatible vehicle systems. Whether you are buying from a private seller or a dealership, the aim is to give you useful information about the individual car before you decide. All Pre-Purchase Inspections take place exclusively at our Al Quoz workshop. We do not inspect US-specification vehicles.",
  ],
  price: { label: "Inspection price", value: "AED 1,500 plus VAT" },
  credit: {
    label: "Repair credit",
    value:
      "AED 500 towards repairs identified during the inspection and subsequently carried out at SilberArrows",
  },
  cta: "Book your Pre-Purchase Inspection",
};

export const ppiWhy = {
  title: "Why a Pre-Purchase Inspection matters",
  paragraphs: [
    "A Mercedes-Benz can look well presented and feel comfortable during a short viewing while still having maintenance needs or faults that are difficult to recognise. A clean interior, low displayed mileage or a recent service is useful background, but each tells only part of the vehicle's story.",
    "An inspection helps you consider the purchase price alongside the car's current condition and likely maintenance needs. Worn tyres, brake wear, visible leaks or an unresolved warning may affect your decision even when the vehicle otherwise appears suitable. Understanding the significance of a finding matters as much as identifying it.",
    "The findings can help you discuss concerns with the seller, seek further investigation, negotiate with a clearer understanding of the work required or decide that another vehicle is more suitable. Arrange the inspection before completing the purchase, while you still have time to consider the results.",
  ],
};

export type PpiArea = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  /** Paragraphs before the checklist. */
  lead?: string[];
  items?: string[];
  /** Paragraphs after the checklist. */
  notes?: string[];
  reading?: { href: string; label: string };
};

export const ppiCoverage = {
  title: "What a SilberArrows Pre-Purchase Inspection covers",
  paragraphs: [
    "We assess the vehicle's mechanical condition, accessible components and electrical operation, supported by diagnostic information and the maintenance records made available to us. The checks are tailored to the model, specification and equipment fitted to the vehicle. The report also records vehicle details, interior and exterior findings, and the presence of applicable removable items supplied with the car.",
    "Findings reflect what can be observed or assessed at the time of inspection. Where a concern needs more detailed diagnosis to establish its cause or repair requirements, we explain that distinction. The assessment should not be understood as confirmation of the internal condition of every component.",
  ],
  areas: [
    {
      id: "engine-and-transmission",
      title: "Engine and transmission",
      image: "/assets/images/ppi/engine-bay.webp",
      imageAlt: "Mercedes-AMG G 63 with the bonnet open, showing the engine bay.",
      lead: [
        "The engine and transmission are central to the assessment. Their operation, visible condition and relevant diagnostic information help us identify concerns that deserve attention before purchase.",
      ],
      items: [
        "Engine operation, visible fluid leaks, accessible fluid levels and cooling-system condition.",
        "Transmission-related symptoms, including concerns about gear engagement or changing gear during the driving assessment, together with relevant diagnostic findings.",
        "Accessible belts, hoses and other components showing visible wear or deterioration.",
      ],
      notes: [
        "Uneven running, unusual noises or evidence of leakage may require further investigation. A symptom can identify an area of concern without establishing the exact repair needed. We explain when a separate diagnostic assessment would be appropriate.",
      ],
    },
    {
      id: "suspension-steering-and-underbody",
      title: "Suspension, steering and underbody",
      image: "/assets/images/ppi/underbody.webp",
      imageAlt: "Low view of the rear underside and suspension of a Mercedes-AMG G 63.",
      items: [
        "Accessible suspension and steering components, including visible wear or deterioration.",
        "Inspection of the underside, including the condition of accessible components and visible evidence of leaks or damage.",
        "Relevant observations and warning information for the suspension system fitted to the vehicle.",
      ],
      notes: [
        "Different Mercedes-Benz models use different suspension arrangements. We consider the equipment fitted to the particular vehicle when interpreting observations. Suspension and steering findings help you understand concerns about ride comfort, handling and maintenance that may affect your ownership plans.",
      ],
    },
    {
      id: "brakes-tyres-and-wheels",
      title: "Brakes, tyres and wheels",
      image: "/assets/images/ppi/wheel.webp",
      imageAlt: "Close-up of a Mercedes-AMG G 63 alloy wheel, tyre and red brake calliper.",
      items: [
        "Brake-pad wear and brake-disc condition, with actual disc-thickness measurements compared with the relevant minimum where applicable to the braking system fitted.",
        "Tyre manufacturer, size, year of manufacture and visible condition, with tread-depth measurements across the inner, centre and outer sections.",
        "Wheel condition, including visible damage and cosmetic condition, together with parking-brake operation.",
      ],
      notes: [
        "These findings help you understand expenditure that may arise soon after purchase. Tyre age and wear both matter: a car that has covered relatively few kilometres can still have older tyres. Uneven wear can also justify closer investigation of the tyres, suspension or alignment.",
      ],
    },
    {
      id: "air-conditioning-and-electrical-functions",
      title: "Air conditioning and electrical functions",
      image: "/assets/images/ppi/cabin.webp",
      imageAlt: "Mercedes-AMG G 63 cabin with centre console, climate controls and screens.",
      items: [
        "Air-conditioning and climate-control operation.",
        "Observations on the main 12-volt battery and any separate starter battery, where fitted, alongside relevant electrical and comfort-system functions. Auxiliary-battery testing is not included.",
        "Instrument warnings and diagnostic fault information available from compatible systems.",
      ],
      notes: [
        "Electrical concerns can affect everyday use even when they do not prevent the vehicle from being driven. Features such as window controls, electric seats and infotainment can be important to the buyer. We consider the functions assessed and any symptoms observed alongside the diagnostic findings.",
      ],
    },
    {
      id: "service-history-and-maintenance-requirements",
      title: "Service history and maintenance requirements",
      image: "/assets/images/ppi/exhausts.webp",
      imageAlt: "Side sill and twin exhaust outlets of a Mercedes-AMG G 63.",
      lead: [
        "Available service records, maintenance invoices and details of previous repairs help us understand how the vehicle has been maintained. Please provide these before the inspection wherever possible, including any information the seller holds about recently replaced components.",
        "We consider those records alongside the vehicle's current condition. Where the history is incomplete, we explain which maintenance items deserve further review. The purpose is to establish what has been documented and what remains uncertain, so you can plan sensibly for ownership. An inspection does not authenticate every historical record or recreate missing history.",
      ],
      reading: {
        href: "/blog/bought-a-used-mercedes-benz-what-should-you-do-first",
        label: "Bought a Used Mercedes-Benz? What Should You Do First?",
      },
    },
    {
      id: "road-test-and-driving-assessment",
      title: "Road test and driving assessment",
      image: "/assets/images/ppi/road-test.webp",
      imageAlt: "Side profile of a blue Mercedes-AMG G 63 driving across a studio floor.",
      lead: [
        "The driving assessment helps us consider how the vehicle behaves on the road, including engine response, transmission operation, steering, ride and braking. It also provides an opportunity to identify noises, vibration or other symptoms that may not be apparent while the vehicle is stationary.",
        "A road test depends on safe and lawful road use and permission to drive the vehicle. If the vehicle cannot be road-tested, that limitation needs to be considered when interpreting the findings.",
      ],
    },
    {
      id: "bodywork-and-evidence-of-previous-repairs",
      title: "Bodywork and evidence of previous repairs",
      image: "/assets/images/ppi/front-three-quarter.webp",
      imageAlt: "Front three-quarter view of a blue Mercedes-AMG G 63.",
      lead: [
        "Paint-depth measurements form part of our Pre-Purchase Inspection. We use a high-specification professional paint-depth gauge to assess suitable painted surfaces for variations in thickness that may indicate previous repainting or repair work. We consider the readings alongside the vehicle's visible bodywork condition and other inspection findings.",
        "Visible signs of previous repairs or damage can be relevant to a buying decision. Any concerns should be considered alongside available vehicle-history records. A condition assessment cannot establish a complete accident history or rule out every concealed repair or instance of water damage.",
      ],
    },
    {
      id: "mercedes-benz-xentry-diagnostics",
      title: "Mercedes-Benz XENTRY diagnostics",
      image: "/assets/images/ppi/cockpit.webp",
      imageAlt: "Mercedes-AMG G 63 steering wheel and digital instrument cluster.",
      lead: [
        "We use Mercedes-Benz XENTRY diagnostics to communicate with compatible vehicle control systems and review available stored or current fault information. Depending on the model and equipment, relevant systems can include the engine, transmission, suspension, climate control and safety systems.",
        "The diagnostic scan supports the physical assessment. We interpret the information in the context of the vehicle's symptoms, condition and available history. A stored fault may relate to an earlier or intermittent event; it does not, on its own, establish that a particular part needs replacing.",
        "Equally, the absence of an active warning light or recorded fault does not prove that every mechanical component is in good condition. Some concerns are identified through physical observation or driving assessment. Where a finding requires further diagnosis, we explain what remains uncertain before a repair recommendation is finalised.",
      ],
    },
  ] satisfies PpiArea[],
};

export const ppiFindings = {
  title: "What happens when problems are found",
  intro:
    "Finding a fault or maintenance requirement does not automatically make a used Mercedes-Benz unsuitable. The significance depends on the nature of the concern, the work involved and how it affects your intended use and budget. We help you distinguish between:",
  tiers: [
    {
      label: "Immediate concerns",
      text: "issues that need further investigation or attention before regular use or before you commit to the purchase.",
      tone: "immediate",
    },
    {
      label: "Upcoming maintenance",
      text: "work that should be planned and included in your ownership budget.",
      tone: "upcoming",
    },
    {
      label: "Items to monitor",
      text: "observations that deserve attention over time but do not necessarily require immediate replacement or repair.",
      tone: "monitor",
    },
  ] as const,
  paragraphs: [
    "We present the findings in a Technical Inspection Report with sections for the exterior, interior, engine bay and underside, together with relevant measurements and notes. We explain any recommendations for further investigation. You can then discuss the findings with the seller and decide how to proceed. A repair quotation can be prepared separately where the work required is sufficiently clear; some faults need additional diagnosis before an accurate quotation is possible.",
    "Repairs and additional diagnostic work require separate authorisation. If you choose to have repairs arising from the inspection findings carried out at SilberArrows, the AED 500 repair credit can be applied towards that work.",
  ],
};

export const ppiRta = {
  title: "Pre-Purchase Inspection compared with an RTA vehicle test",
  intro:
    "A standard RTA technical test assesses roadworthiness for registration and other official vehicle requirements. A Mercedes-Benz Pre-Purchase Inspection helps you understand the condition of the vehicle and potential maintenance needs before deciding whether to buy it.",
  headers: [
    "Aspect",
    "SilberArrows Pre-Purchase Inspection",
    "Standard RTA technical test",
  ],
  rows: [
    {
      aspect: "Main purpose",
      ppi: "Help you assess a used Mercedes-Benz before purchase.",
      rta: "Assess roadworthiness for the relevant official vehicle procedure.",
    },
    {
      aspect: "Technical focus",
      ppi: "Vehicle condition, mechanical observations and compatible Mercedes-Benz diagnostics.",
      rta: "The checks required by the applicable official test procedure.",
    },
    {
      aspect: "Result",
      ppi: "Condition findings, areas of concern and maintenance or investigation recommendations.",
      rta: "An official technical inspection result for the applicable procedure.",
    },
    {
      aspect: "How they relate",
      ppi: "Additional information for your buying decision; official requirements still apply.",
      rta: "A different purpose from a buyer-focused Mercedes-Benz assessment.",
    },
  ],
  notes: [
    "This comparison refers to the standard technical test. Testing centres may offer additional inspection products with a different scope. Check which service you are booking and what it includes.",
    "A Pre-Purchase Inspection does not replace official registration or ownership-transfer requirements. You should also review the available ownership and vehicle-history records; a physical inspection does not verify legal title or resolve outstanding finance.",
  ],
};

export const ppiImports = {
  title: "GCC and imported Mercedes-Benz vehicles",
  paragraphs: [
    "We assess GCC-specification Mercedes-Benz vehicles and imported models from Japan, Europe and other markets. We do not inspect US-specification vehicles. For vehicles within our inspection scope, the individual car's condition, maintenance history and specification are the starting point. Its country of origin or a low displayed mileage should not be treated as proof of its condition.",
    "For a GCC-specification vehicle, available local maintenance and repair records help build a picture of its history. For imported vehicles within our inspection scope, overseas records and details of the original market specification are also useful. Any gaps in that information should be considered alongside the inspection findings.",
    "Share the vehicle identification number (VIN), model, year, original market specification and any available records when booking. This helps us confirm that the vehicle falls within our inspection scope and plan the assessment around its specification. If you have a particular concern about imported equipment, a warning message or previous repairs, tell us in advance.",
  ],
  reading: {
    href: "/blog/bought-an-imported-mercedes-benz-in-dubai-what-to-do-next",
    label: "Bought an Imported Mercedes-Benz in Dubai? What to Do Next",
  },
};

export const ppiSteps = {
  title: "How to arrange a Pre-Purchase Inspection",
  steps: [
    {
      lead: "Share the vehicle details.",
      text: "Provide the model, year, displayed mileage, original market specification and VIN if available. Tell us where the vehicle is located, whether it is being sold privately or by a dealership, and any concerns you would like us to consider.",
    },
    {
      lead: "Arrange the workshop visit with the seller.",
      text: "Obtain permission for the inspection and driving assessment, and arrange for the vehicle to be brought to our workshop and left with us for the full day. Our team will confirm the appointment and handover arrangements. Make any road-use restrictions clear before the appointment.",
    },
    {
      lead: "Have the vehicle assessed.",
      text: "We carry out the applicable physical checks and review diagnostic information from compatible systems. Provide available service records and repair invoices so they can be considered alongside the vehicle's current condition.",
    },
    {
      lead: "Review the findings before deciding.",
      text: "Your Technical Inspection Report is sent by email or WhatsApp on the day after the inspection, normally by the end of that day. Consider any concerns, further investigation and maintenance you may need to budget for, then discuss the findings with the seller before completing the purchase.",
    },
  ],
  location:
    "All Pre-Purchase Inspections are carried out exclusively at our workshop on Al Manara Street, Al Quoz Industrial Area 1, Dubai. We do not offer mobile or on-site inspections. You do not need to own the vehicle to arrange an inspection, but the seller must agree to the workshop visit and authorise the necessary access. Let us know if you are working towards a purchase deadline so the appointment can be planned accordingly.",
};

export const ppiPricing = {
  title: "Inspection price and AED 500 repair credit",
  paragraphs: [
    "Our Mercedes-Benz Pre-Purchase Inspection costs AED 1,500 plus VAT and includes AED 500 repair credit towards repairs identified during the inspection and subsequently carried out at SilberArrows.",
    "The inspection fee remains AED 1,500 plus VAT. The AED 500 is credit against qualifying repair work; it is not automatically deducted from the inspection price. Repair work is quoted and authorised separately.",
    "If the inspection identifies no repairs, you still receive an assessment of the vehicle's observable condition to help inform your purchase. Where work is recommended, you can consider the findings and any further investigation before deciding whether to proceed with the vehicle or authorise repairs.",
  ],
};

export const ppiWhyUs = {
  title: "Why choose SilberArrows",
  intro:
    "SilberArrows is an independent Mercedes-Benz specialist in Al Quoz, Dubai. We work on Mercedes-Benz vehicles only. Our experience of servicing and repairing these vehicles helps us assess findings in the context of the particular model and its maintenance requirements.",
  items: [
    "Specialist expertise in Mercedes-AMG and Mercedes-Maybach, alongside world-leading experience of the Mercedes-Benz SLR McLaren.",
    "Mercedes-Benz XENTRY diagnostics, used alongside physical assessment and driving observations.",
    "Workshop experience with mechanical, electrical and transmission repairs.",
    "Clear explanations of the findings, with separate investigation and repair quotations where required.",
  ],
  note: "If you subsequently authorise servicing or repairs at SilberArrows, our work is supported by a 12-month parts and labour warranty under the applicable terms. That warranty relates to the work carried out; the Pre-Purchase Inspection itself is an assessment of the vehicle's condition at the time.",
};

export const ppiFaqs: FAQ[] = [
  {
    question: "How much is a Mercedes-Benz Pre-Purchase Inspection in Dubai?",
    answer:
      "Our Pre-Purchase Inspection costs AED 1,500 plus VAT and includes AED 500 credit towards repairs identified during the inspection and subsequently carried out at SilberArrows. The credit is applied to qualifying repairs, while the inspection fee remains AED 1,500 plus VAT.",
  },
  {
    question: "How does the AED 500 repair credit work?",
    answer:
      "The credit is applied towards repairs arising from the inspection findings when you have that work completed at SilberArrows. Repairs are quoted and authorised separately. The credit does not reduce the inspection fee, which remains AED 1,500 plus VAT.",
  },
  {
    question: "Why should I inspect a used Mercedes-Benz before paying for it?",
    answer:
      "An inspection can identify concerns that are not obvious during a viewing or short test drive. Understanding the vehicle's condition before purchase gives you time to investigate issues, discuss them with the seller and consider likely maintenance costs before committing.",
  },
  {
    question: "What does a Mercedes-Benz PPI cover?",
    answer:
      "The assessment covers the engine and transmission, accessible suspension and steering components, brakes, tyres and wheels, cooling-system condition, air conditioning, relevant battery and electrical-system observations, the underside, interior and bodywork condition, paint-depth measurements, and compatible diagnostic information. It includes relevant brake and tyre measurements, with checks tailored to the braking system and equipment fitted. Battery observations relate to the main 12-volt battery and any separate starter battery, where fitted; auxiliary-battery testing is not included. Available maintenance records and driving observations are considered alongside those findings. The applicable checks depend on the vehicle's model, specification and condition.",
  },
  {
    question: "Does SilberArrows use Mercedes-Benz XENTRY diagnostics?",
    answer:
      "Yes. We use Mercedes-Benz XENTRY diagnostics to review available fault information from compatible vehicle control systems. The results are interpreted alongside physical checks and observed symptoms. A diagnostic scan alone cannot establish the condition of every mechanical component.",
  },
  {
    question: "Does the inspection include a road test?",
    answer:
      "Yes, where the vehicle can be driven safely and lawfully and permission has been given. The driving assessment helps us evaluate how the vehicle behaves on the road, including its engine response, transmission operation, steering, ride and braking. If a road test cannot be completed, that limits the assessment.",
  },
  {
    question: "Will the inspection detect previous accident damage?",
    answer:
      "We use a high-specification paint-depth gauge to help identify variations in paint thickness that may indicate previous repainting or repairs. We consider these readings alongside visible signs of previous repairs or damage. These checks cannot certify a complete accident history or identify every concealed repair or instance of water damage. Consider the findings alongside available vehicle-history records, and investigate significant concerns before purchasing.",
  },
  {
    question: "Can a PPI prove that the mileage is genuine?",
    answer:
      "It cannot guarantee the vehicle's complete mileage history. Available service records, invoices, diagnostic information and the vehicle's condition can be considered together and may highlight inconsistencies. A low odometer reading should not replace a review of the available history and present condition.",
  },
  {
    question: "Is an RTA test enough when buying a used Mercedes-Benz?",
    answer:
      "A standard RTA technical test serves official roadworthiness and vehicle-procedure requirements. A Pre-Purchase Inspection provides additional information about the condition and maintenance needs of the Mercedes-Benz you are considering. If a testing centre offers a separate comprehensive inspection, check its scope when comparing services.",
  },
  {
    question: "Can you inspect an imported Mercedes-Benz from Japan or Europe?",
    answer:
      "Yes. We inspect Mercedes-Benz vehicles imported from Japan and Europe, as well as GCC-specification models. We do not inspect US-specification vehicles, regardless of where they are imported from. Provide the VIN, original market specification and any overseas service or repair records when booking. Tell us about any particular equipment or concerns you want to discuss.",
  },
  {
    question:
      "Can I arrange an inspection for a car being sold by a private seller or dealership?",
    answer:
      "Yes. You can arrange an inspection for a vehicle offered by either a private seller or a dealership. The seller must agree to the inspection and make the vehicle available at our Al Quoz workshop. We do not carry out mobile or on-site inspections. Coordinate the workshop visit and permission for the driving assessment before confirming the appointment.",
  },
  {
    question: "How long does a Pre-Purchase Inspection take?",
    answer:
      "The inspection time varies by model and specification. For example, a Mercedes-Benz C200 takes considerably less time to inspect than an SLR McLaren. We ask you to leave the vehicle with us at our workshop for the full day so our team has the time needed to complete the assessment.\n\nYour Technical Inspection Report is sent on the day after the inspection, normally by the end of that day. We confirm the expected arrangements when booking. If a finding needs separate diagnostic work, we explain that before any additional work is authorised.",
  },
  {
    question: "Will I receive a written inspection report?",
    answer:
      "Yes. You receive a Technical Inspection Report setting out the findings, delivered by email or WhatsApp. It records the relevant condition findings, brake and tyre measurements, vehicle details, number of keys and applicable removable items. It also records whether diagnostic testing and a road test were performed. We send it on the day after the inspection, normally by the end of that day.\n\nWe explain the inspection findings and help you distinguish immediate concerns, upcoming maintenance and items to monitor. Where an issue needs further investigation, we make that clear so you can consider the remaining uncertainty before deciding on the purchase.",
  },
  {
    question: "What happens if your technicians find a fault?",
    answer:
      "We explain the finding, its significance and whether further investigation is needed. Any repairs are quoted separately where the required work is clear. If you authorise repairs arising from the inspection findings at SilberArrows, the AED 500 repair credit can be applied towards that work.",
  },
  {
    question: "Does a Pre-Purchase Inspection guarantee the car will be problem-free?",
    answer:
      "No. The inspection assesses the vehicle's observable condition at a particular time, within the checks that can be completed. It cannot rule out every concealed or intermittent fault, establish the internal condition of every component or guarantee future reliability. Findings that require further investigation should be considered before purchase.",
  },
  {
    question: "How do I book a Mercedes-Benz Pre-Purchase Inspection in Dubai?",
    answer:
      "Call +971 4 380 5515, contact us through WhatsApp or email service@silberarrows.com. Share the model, year, displayed mileage, original market specification and VIN if available, along with the seller's location and any particular concerns. We will confirm your appointment and handover arrangements at our workshop on Al Manara Street, Al Quoz Industrial Area 1, Dubai. All inspections take place at this workshop.",
  },
];

export const ppiClosing = {
  title: "Book your Mercedes-Benz Pre-Purchase Inspection",
  text: "Understand the Mercedes-Benz you are considering before completing the purchase. Contact SilberArrows to arrange your Pre-Purchase Inspection at our Al Quoz workshop and discuss any concerns you would like our team to assess.",
  price: { label: "Pre-Purchase Inspection", value: "AED 1,500 plus VAT" },
  credit: {
    label: "Repair credit",
    value: "AED 500 towards inspection-identified repairs carried out at SilberArrows",
  },
};
