export type FAQ = { question: string; answer: string };

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  mobileLabel: string;
  blurb: string;
  overview: string;
  bullets: { heading: string; items: string[] };
  process: string[];
  hero: string;
  faqs?: FAQ[];
  comparison?: {
    headers: string[];
    rows: { label: string; values: string[] }[];
  };
};

export const services: Service[] = [
  {
    slug: "brake-service",
    title: "Brake Service & Repair",
    shortTitle: "Brake Service",
    mobileLabel: "Brakes",
    blurb:
      "Comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts.",
    hero: "/assets/images/brake-service-640.webp",
    overview:
      "Your Mercedes-Benz braking system is critical to safety and performance. We conduct comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts. Whether it's routine pad replacement or complex hydraulic repairs, we ensure optimal braking performance and peace of mind, without compromising factory standards.",
    bullets: {
      heading: "What's Included",
      items: [
        "Brake pad and disc replacement",
        "Brake fluid flush and bleed",
        "Calliper and sensor inspection",
        "Electronic brake system reset",
      ],
    },
    process: [
      "Road test to assess brake feel, noise, and response",
      "Full inspection of pads, discs, brake lines, and callipers",
      "Measurement of pad wear and rotor thickness",
      "Replacement with genuine Mercedes-Benz parts; brake system bleeding and recalibration",
      "Final safety test and technician report",
    ],
    faqs: [
      {
        question: "How do I know if my brakes need attention?",
        answer:
          "Common signs include vibration, squealing, longer stopping distances, warning messages or brake pedal changes. We recommend having the braking system inspected as soon as any symptoms appear.",
      },
      {
        question: "Do you work on AMG braking systems?",
        answer:
          "Yes. We work on standard and AMG braking systems including large-performance brake packages and electronic braking systems.",
      },
    ],
  },
  {
    slug: "scheduled-maintenance",
    title: "Scheduled Maintenance \u2013 Service A & B",
    shortTitle: "Scheduled Maintenance",
    mobileLabel: "Maintenance",
    blurb:
      "Regular servicing is essential to retain your vehicle's efficiency, safety, and long-term value.",
    hero: "/assets/images/maintenance-640.webp",
    overview:
      "Regular servicing is essential to retain your vehicle's efficiency, safety, and long-term value. We follow official Mercedes-Benz service schedules using XENTRY Diagnosis and genuine parts to maintain optimal performance and full-service history integrity.",
    bullets: {
      heading: "What's Included",
      items: [
        "Engine oil, oil filter, and air filter replacement",
        "Check and top-up of all fluids",
        "Visual inspection of underbody, engine bay, brakes, and tyres",
        "Diagnostics check using XENTRY Diagnosis",
        "Maintenance counter reset and full valet",
      ],
    },
    process: [
      "Review of service history and factory schedule",
      "All maintenance tasks performed to factory specification",
      "Use of Mercedes-Benz genuine oil and parts",
      "Update of your vehicle's service records and indicator reset",
      "Technician report with maintenance recommendations",
    ],
    comparison: {
      headers: ["What's Included", "Service A (Minor)", "Service B (Major)"],
      rows: [
        {
          label: "Engine oil, oil filter, and air filter replacement",
          values: ["\u2713", "\u2713"],
        },
        { label: "Check and top-up of all fluids", values: ["\u2713", "\u2713"] },
        {
          label: "Visual inspection of underbody, engine bay, brakes, and tyres",
          values: ["\u2713", "\u2713"],
        },
        {
          label: "Diagnostics check using XENTRY Diagnosis",
          values: ["\u2713", "\u2713"],
        },
        {
          label: "Maintenance counter reset and full valet",
          values: ["\u2713", "\u2713"],
        },
        {
          label: "Dust or combination filter replacement",
          values: ["\u2014", "\u2713"],
        },
        { label: "A/C system treatment", values: ["\u2014", "\u2713"] },
        {
          label: "Wheel rotation and spare wheel or TIREFIT sealant check",
          values: ["\u2014", "\u2713"],
        },
        { label: "Full Vehicle Inspection", values: ["\u2713", "\u2713"] },
      ],
    },
    faqs: [
      {
        question: "How often should a Mercedes-Benz be serviced?",
        answer:
          "Most Mercedes-Benz models require servicing every 12 months or 15,000 km, depending on usage and driving conditions.",
      },
      {
        question: "What is the difference between Service A and Service B?",
        answer:
          "Service A is the smaller routine maintenance interval, while Service B includes additional maintenance items and inspections. The exact requirements vary depending on model, age and mileage.",
      },
      {
        question: "Do you follow Mercedes-Benz service schedules?",
        answer:
          "Yes. We follow manufacturer maintenance schedules and service procedures specific to your model.",
      },
    ],
  },
  {
    slug: "tyre-replacement",
    title: "Tyre Replacement & Balancing",
    shortTitle: "Tyre Replacement",
    mobileLabel: "Tyres",
    blurb:
      "We supply and fit Mercedes-Benz-approved tyres, including run-flats and AMG-specific sizes.",
    hero: "/assets/images/tyres-640.webp",
    overview:
      "Proper tyres are crucial for safety, performance, and comfort. We supply and fit Mercedes-Benz-approved tyres, including run-flats and AMG-specific sizes, and calibrate TPMS sensors to factory standards.",
    bullets: {
      heading: "What's Included",
      items: [
        "Tyre fitting and wheel balancing",
        "TPMS sensor calibration and reprogramming",
        "Run-flat and performance tyre options",
      ],
    },
    process: [
      "Inspection of existing tyres for wear and damage",
      "Selection and fitting of appropriate replacement tyres",
      "Dynamic wheel balancing to prevent vibrations",
      "TPMS sensor reset or programming as required",
      "Test drive to ensure correct fit and performance",
    ],
    faqs: [
      {
        question: "Do you fit run-flat and AMG tyres?",
        answer:
          "Yes. We supply and fit standard, run-flat and AMG performance tyres depending on your vehicle requirements.",
      },
    ],
  },
  {
    slug: "wheel-alignment",
    title: "Wheel Alignment",
    shortTitle: "Wheel Alignment",
    mobileLabel: "Alignment",
    blurb:
      "Precise wheel alignment for steering accuracy, even tyre wear, and overall vehicle stability.",
    hero: "/assets/images/wheel-alignment-640.webp",
    overview:
      "Precise wheel alignment is essential for steering accuracy, even tyre wear, and overall vehicle stability. We use Hunter 3D laser alignment systems, officially approved by Mercedes-Benz, to perform accurate adjustments on all models, including AMG and 4MATIC variants.",
    bullets: {
      heading: "What's Included",
      items: [
        "Four-wheel laser alignment",
        "Steering angle sensor recalibration",
        "Pre- and post-alignment reports",
      ],
    },
    process: [
      "Visual inspection and measurement of wheel alignment angles",
      "Mounting on alignment platform with sensor attachment",
      "Adjustment of toe, camber, and caster angles to Mercedes-Benz specifications",
      "Steering angle sensor reset to avoid warning lights",
      "Documentation of alignment results before and after adjustment",
    ],
    faqs: [
      {
        question: "How often should wheel alignment be checked?",
        answer:
          "We recommend checking alignment after tyre replacement, suspension work, pothole impacts or whenever uneven tyre wear or steering pull is noticed.",
      },
    ],
  },
  {
    slug: "battery-service",
    title: "Battery Testing & Replacement",
    shortTitle: "Battery Service",
    mobileLabel: "Battery",
    blurb:
      "Our battery services ensure reliable starts and prevent electrical issues.",
    hero: "/assets/images/battery-640.webp",
    overview:
      "Modern Mercedes-Benz models rely heavily on electrical systems. Our battery services ensure reliable starts and prevent electrical issues. We install original Mercedes-Benz batteries and perform full electronic registration with your vehicle's control units.",
    bullets: {
      heading: "Services Include",
      items: [
        "Battery load and voltage test",
        "Charging system and alternator inspection",
        "Battery replacement and ECU registration",
      ],
    },
    process: [
      "Battery and charging system assessment",
      "Inspection of terminals, grounds, and cables",
      "Professional removal and disposal of old unit",
      "Installation of original Mercedes-Benz battery and software registration",
      "System test to verify electrical readiness",
    ],
    faqs: [
      {
        question:
          "How long do Mercedes-Benz batteries typically last in Dubai?",
        answer:
          "Due to high temperatures, most batteries typically last around 3\u20134 years depending on usage and driving habits.",
      },
      {
        question: "Does a new battery need programming?",
        answer:
          "Many modern Mercedes-Benz models require battery registration or coding after replacement so the charging and energy-management systems operate correctly.",
      },
    ],
  },
  {
    slug: "air-conditioning",
    title: "Air Conditioning Service & Repair",
    shortTitle: "Air Conditioning",
    mobileLabel: "A/C",
    blurb:
      "A properly functioning A/C system ensures cabin comfort and optimal air quality.",
    hero: "/assets/images/Air-conditioning-640.webp",
    overview:
      "A properly functioning A/C system ensures cabin comfort and air quality. We service all Mercedes-Benz refrigerant types (R134a & R1234yf), replacing filters, diagnosing leaks, and restoring performance.",
    bullets: {
      heading: "Services Include",
      items: [
        "Refrigerant recovery, refill, and leak detection",
        "Compressor, condenser, and evaporator check",
        "Cabin filter replacement",
        "Disinfection and odour treatment",
      ],
    },
    process: [
      "System pressure and leak test",
      "Blower, condenser, and filter inspection",
      "Refrigerant evacuation and refill to correct spec",
      "Disinfection of air ducts and evaporator housing",
      "Final cooling performance verification",
    ],
    faqs: [
      {
        question: "Why is my air conditioning not cold enough?",
        answer:
          "Common causes include low refrigerant, leaks, blocked filters or failing components. In Dubai's climate, regular air-conditioning maintenance is especially important.",
      },
      {
        question: "How often should the cabin filter be replaced?",
        answer:
          "We typically recommend replacing the cabin filter every 12 months due to dust and environmental conditions in the UAE.",
      },
    ],
  },
  {
    slug: "engine-repair",
    title: "Engine Repair & Overhaul",
    shortTitle: "Engine Repair",
    mobileLabel: "Engine",
    blurb:
      "From minor engine issues to complete overhauls using factory repair methods.",
    hero: "/assets/images/ENGINE-640.webp",
    overview:
      "We handle everything from minor engine issues to complete overhauls using factory repair methods and genuine parts. Common services include timing component replacement, gasket and seal replacement, and turbocharger diagnosis and replacement, all performed to restore smooth performance, emissions compliance, and long-term reliability.",
    bullets: {
      heading: "Common Repairs",
      items: [
        "Timing chain and tensioner replacement",
        "Cylinder head gasket and seal replacement",
        "Turbocharger diagnosis and replacement",
        "Full engine disassembly and rebuilds",
      ],
    },
    process: [
      "Diagnostic testing (compression test, leak-down test, oil analysis)",
      "Dismantling and inspection of affected components",
      "Replacement with genuine Mercedes-Benz parts and precise reassembly",
      "ECU recalibration and post-repair leak and performance testing",
      "Final road test and detailed engine condition report",
    ],
    faqs: [
      {
        question: "Do you repair common Mercedes-Benz engine issues?",
        answer:
          "Yes. We regularly diagnose and repair oil leaks, cooling-system faults, timing-chain issues, turbocharger faults and other engine-related problems across a wide range of Mercedes-Benz engines.",
      },
      {
        question: "How long do major repairs usually take?",
        answer:
          "Repair times vary depending on the fault, parts availability and complexity of the work. We provide estimated timelines and updates throughout the process.",
      },
    ],
  },
  {
    slug: "suspension-repair",
    title: "Suspension & Steering Repair",
    shortTitle: "Suspension Repair",
    mobileLabel: "Suspension",
    blurb:
      "Complete suspension system diagnostics and repair for smooth, comfortable driving.",
    hero: "/assets/images/suspension-640.webp",
    overview:
      "Suspension comfort and steering precision are hallmarks of a Mercedes-Benz. We specialise in both conventional and advanced systems including AIRMATIC and ABC (Active Body Control), using genuine Mercedes-Benz parts for all repairs and replacements.",
    bullets: {
      heading: "We Handle",
      items: [
        "Shock absorber and strut replacement",
        "Air suspension leak repair and compressor service",
        "Control arm and bushing replacement",
        "Steering rack and power steering system repairs",
      ],
    },
    process: [
      "Road test to evaluate handling and ride quality",
      "Inspection of suspension components and ride height sensors",
      "Replacement of worn or faulty parts using genuine Mercedes-Benz parts",
      "Calibration of electronic suspension systems and ride height adjustment",
      "Final road test to confirm handling and comfort restoration",
    ],
    faqs: [
      {
        question: "Do you repair AIRMATIC suspension systems?",
        answer:
          "Yes. We diagnose and repair AIRMATIC systems including compressors, air struts, valve blocks and ride-height related faults.",
      },
      {
        question: "Why is my Mercedes-Benz sitting low overnight?",
        answer:
          "This is commonly caused by an air suspension leak or a fault within the suspension control system. We carry out pressure testing and diagnostics to identify the fault correctly.",
      },
    ],
  },
  {
    slug: "diagnostics",
    title: "Electrical & Computer Diagnostics",
    shortTitle: "Diagnostics",
    mobileLabel: "Diagnostics",
    blurb:
      "We identify and resolve issues with ECUs, control modules, sensors, and wiring faults.",
    hero: "/assets/images/diagnostics-640.webp",
    overview:
      "Mercedes-Benz vehicles feature advanced electronics across all systems. Using XENTRY Diagnosis, the official Mercedes-Benz diagnostic platform, we identify and resolve issues with ECUs, control modules, sensors, and wiring faults.",
    bullets: {
      heading: "Diagnostic Capabilities",
      items: [
        "XENTRY Diagnosis system fault scanning",
        "ECU resets and software updates",
        "Sensor testing and wiring repairs",
      ],
    },
    process: [
      "Full vehicle scan using XENTRY Diagnosis to retrieve fault codes",
      "Systematic analysis based on manufacturer data",
      "Testing and repair of components and wiring harnesses",
      "Software updates and clearing of fault memory",
      "Final verification and detailed diagnostic report",
    ],
    faqs: [
      {
        question: "Can you diagnose warning lights and electrical faults?",
        answer:
          "Yes. We diagnose engine, transmission, suspension, electrical and electronic faults using Mercedes-Benz diagnostic systems and guided testing procedures.",
      },
      {
        question: "Do you carry out software programming and coding?",
        answer:
          "Yes. We carry out coding, programming and software-related functions where required, depending on the model and system involved.",
      },
    ],
  },
  {
    slug: "detailing",
    title: "Interior & Exterior Detailing",
    shortTitle: "Detailing",
    mobileLabel: "Detailing",
    blurb:
      "Restore your Mercedes-Benz to showroom condition with our professional detailing services.",
    hero: "/assets/images/detailing-640.webp",
    overview:
      "Restore your Mercedes-Benz to showroom condition with our professional detailing services. We use premium, vehicle-safe products tailored to Mercedes-Benz interiors, leather, and paint systems. From multi-stage polishing to optional ceramic coatings, our detailing protects your investment and enhances resale value.",
    bullets: {
      heading: "What's Included",
      items: [
        "Snow foam wash and paint correction",
        "Ceramic coating (optional)",
        "Interior shampoo and leather care",
        "Engine bay and alloy wheel detailing",
      ],
    },
    process: [
      "Pre-wash and paintwork decontamination",
      "Clay bar treatment to remove embedded contaminants",
      "Machine polishing to eliminate swirl marks and defects",
      "Deep interior cleaning and leather conditioning",
      "Optional: Application of paint sealants or Gtechniq ceramic protection",
    ],
    faqs: [
      {
        question: "Do you offer ceramic coating and paint protection?",
        answer:
          "Yes. We offer professional detailing, paint correction and ceramic coating services to help protect and preserve your vehicle's finish.",
      },
      {
        question: "Can you remove swirl marks and light scratches?",
        answer:
          "Yes. Paint correction and machine polishing can significantly improve gloss, clarity and surface finish depending on the condition of the paintwork.",
      },
    ],
  },
];

export const homeFaqs: FAQ[] = [
  {
    question: "What makes SilberArrows different?",
    answer:
      "SilberArrows is an independent Mercedes-Benz specialist based in Dubai, focused exclusively on Mercedes-Benz passenger vehicles. Our workshop combines dealer-level diagnostics and technical expertise with a more personal, transparent and enthusiast-driven approach.",
  },
  {
    question: "What types of Mercedes-Benz vehicles do you work on?",
    answer:
      "We work on the full Mercedes-Benz range, from everyday models through to AMG, Maybach, Mercedes-EQ and specialist vehicles.",
  },
  {
    question: "Do you service and maintain the Mercedes-Benz SLR McLaren?",
    answer:
      "Yes. SilberArrows is widely recognised as one of the region's leading specialists for the Mercedes-Benz SLR McLaren, with many of the GCC's cars maintained by our team over the years.\n\nOur experience with the SLR dates back to when the model was originally introduced, including team members who were factory-trained on the platform during its early production years.\n\nFrom routine maintenance and diagnostics to complex mechanical, hydraulic and electronic repairs, we have extensive hands-on knowledge of the SLR and its unique systems.",
  },
  {
    question: "Do you work on classic Mercedes-Benz vehicles?",
    answer:
      "Yes. Classic Mercedes-Benz vehicles are a major part of what we do. From maintenance and mechanical restoration to sourcing hard-to-find parts and preserving originality, we support both collectors and enthusiasts.",
  },
  {
    question: "Do you use Mercedes-Benz diagnostic systems?",
    answer:
      "Yes. We use XENTRY diagnostics for fault diagnosis, coding, software functions and guided troubleshooting across Mercedes-Benz models.",
  },
  {
    question: "Do you use genuine Mercedes-Benz parts?",
    answer:
      "Yes. We use genuine Mercedes-Benz parts and approved fluids to maintain reliability, performance and long-term vehicle integrity.",
  },
  {
    question: "Do you offer collection and delivery?",
    answer:
      "Yes. We offer complimentary collection and delivery across Dubai for servicing and repair work.",
  },
  {
    question: "Do you offer performance upgrades and tuning?",
    answer:
      "Yes. We supply and install performance upgrades including genuine RENNtech and PowerAi products and software.",
  },
  {
    question: "Do you provide a warranty on repairs and servicing?",
    answer:
      "Yes. All servicing, maintenance and repair work carried out by SilberArrows is backed by a 12-month parts and labour warranty for added peace of mind. Terms and conditions apply.",
  },
  {
    question: "Do you offer service and extended warranty plans?",
    answer:
      "Yes. We offer ServiceCare maintenance plans and our SilberArrows Extended Warranty Program for eligible Mercedes-Benz vehicles, helping customers manage servicing and ownership costs with added peace of mind.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
