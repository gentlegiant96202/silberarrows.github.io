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
        question:
          "How often should I replace the brake pads on my Mercedes-Benz?",
        answer:
          "Most Mercedes-Benz brake pads last 30,000 to 60,000 km depending on driving style and traffic conditions. We inspect pad thickness, disc wear and brake fluid at every service so you only replace what's actually worn.",
      },
      {
        question: "Do you use genuine Mercedes-Benz brake parts?",
        answer:
          "Yes. We only fit genuine Mercedes-Benz pads, discs and brake fluid that meet factory friction and heat-tolerance specs, preserving pedal feel and your service history.",
      },
      {
        question:
          "How much does a Mercedes-Benz brake service cost in Dubai?",
        answer:
          "Brake pad and disc pricing depends on your model and which axle is being serviced. We provide a no-obligation written quote after inspection, with parts and labour itemised before any work begins.",
      },
      {
        question: "Can you reset the electronic parking brake (EPB)?",
        answer:
          "Yes. We use XENTRY Diagnosis to retract and recalibrate the EPB callipers for safe pad replacement on all C-Class, E-Class, S-Class, GLC, GLE and other electronic-park-brake models.",
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
        {
          label: "Transmission Oil Change + Filter Replacement",
          values: ["\u2014", "\u2713"],
        },
        { label: "Full Vehicle Inspection", values: ["\u2713", "\u2713"] },
      ],
    },
    faqs: [
      {
        question:
          "What's the difference between Service A and Service B on a Mercedes-Benz?",
        answer:
          "Service A (Minor) covers oil and filter replacement, fluid top-ups, brake inspection and full diagnostics. Service B (Major) adds cabin filter, A/C treatment, wheel rotation, transmission oil change and a full vehicle inspection. Service A and B alternate roughly every 12 months or 15,000 km.",
      },
      {
        question: "How often does my Mercedes-Benz need a service?",
        answer:
          "Most modern Mercedes-Benz models prompt for service every 12 months or 15,000 km via the ASSYST PLUS maintenance counter. We follow the factory schedule using XENTRY Diagnosis so your service history stays intact.",
      },
      {
        question:
          "Will servicing at SilberArrows affect my Mercedes-Benz warranty?",
        answer:
          "Servicing outside an authorised Mercedes-Benz dealer can void or limit your manufacturer warranty, depending on your vehicle contract and remaining coverage. If your car is still under factory warranty, please confirm your position with Mercedes-Benz or your selling dealer before booking. We use genuine parts and factory schedules, and every job is covered by our own 12-month warranty on parts and labour.",
      },
      {
        question: "How much do I save vs the Mercedes-Benz main dealer?",
        answer:
          "Customers typically save 30 to 40 percent on Service A and Service B compared with dealer pricing, with the same genuine parts and factory schedule. Free collection and delivery across Dubai is included.",
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
        question: "Do you fit run-flat tyres for Mercedes-Benz?",
        answer:
          "Yes. We fit Mercedes-Benz-approved run-flat (MOE/MOExtended) tyres for all models that require them, as well as AMG performance and standard tyres on request.",
      },
      {
        question: "Can you reset the TPMS sensors after a tyre change?",
        answer:
          "Yes. We use XENTRY Diagnosis to relearn and program OEM TPMS sensors so the tyre-pressure warning clears and reads accurately on the instrument cluster.",
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
        question: "How often should I align the wheels on my Mercedes-Benz?",
        answer:
          "We recommend a 4-wheel alignment every 15,000 to 20,000 km, after a kerb impact, or any time you fit new tyres or suspension components to protect tyre life and steering feel.",
      },
      {
        question: "Do you do AMG and 4MATIC alignment?",
        answer:
          "Yes. Our Hunter 3D alignment equipment is approved for AMG and 4MATIC variants and we adjust to model-specific Mercedes-Benz factory specs.",
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
        question: "Why does a new Mercedes battery need to be registered?",
        answer:
          "Modern Mercedes-Benz cars use an Intelligent Battery Sensor and energy-management ECU that tracks charge cycles. A new battery must be coded to the car via XENTRY Diagnosis so the alternator charges it correctly and start-stop and comfort features work.",
      },
      {
        question: "How long does a Mercedes-Benz battery last in Dubai?",
        answer:
          "Dubai heat is hard on batteries. Most original Mercedes-Benz batteries last 3 to 4 years here. We test charge capacity and cranking amps at every service so you can replace before a no-start.",
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
        question: "My Mercedes A/C isn't cold, what's the most common cause?",
        answer:
          "Low refrigerant from a slow leak is the most common cause in Dubai. We pressure-test the system, locate the leak with UV dye or electronic detection and refill to the correct R134a or R1234yf spec for your model.",
      },
      {
        question: "How often should the cabin filter be replaced?",
        answer:
          "We recommend replacing the combination (cabin) filter every 12 months in Dubai's dust. It's included in Service B and improves airflow, smell and HEPA filtration.",
      },
      {
        question: "Do you service R1234yf systems?",
        answer:
          "Yes. We have the equipment and certified refrigerant for newer Mercedes-Benz models that use R1234yf as well as legacy R134a systems.",
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
        question: "Do you replace timing chains on M271, M272 and M276 engines?",
        answer:
          "Yes. Timing chain, guides and tensioner replacement is one of our common engine repairs across M271, M272, M276, M278 and OM651 engines using genuine Mercedes-Benz parts.",
      },
      {
        question: "Can you rebuild a Mercedes turbocharger?",
        answer:
          "We diagnose, repair or replace turbochargers on Mercedes-Benz petrol and diesel engines. Where rebuild is appropriate we use OE-quality CHRA cartridges; otherwise we fit a genuine Mercedes-Benz unit.",
      },
      {
        question: "How long does a Mercedes engine repair take?",
        answer:
          "Small repairs (oil leaks, gaskets, sensors) usually take 1-3 working days. Larger jobs like timing chain or head gasket replacement typically take 4-7 working days. We provide a written timeline before work begins.",
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
        question: "Do you repair AIRMATIC and Active Body Control (ABC)?",
        answer:
          "Yes. We diagnose and repair AIRMATIC air struts, compressors, valve blocks and ride-height sensors as well as ABC pumps, valves and pulsation dampers using genuine Mercedes-Benz parts.",
      },
      {
        question: "Why is my Mercedes sitting low on one corner?",
        answer:
          "This is typically a leaking air strut, faulty compressor or ride-height sensor on AIRMATIC cars. We pressure-test the system and replace the failed component with a genuine Mercedes-Benz unit, then recalibrate ride height.",
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
        question: "Do you use the official XENTRY Diagnosis system?",
        answer:
          "Yes. We use XENTRY Diagnosis, the official Mercedes-Benz factory tool, to read ECUs, run guided tests, perform SCN coding, software updates and component activations.",
      },
      {
        question: "How much does a Mercedes diagnostic scan cost?",
        answer:
          "We offer a competitive flat-rate XENTRY scan with a written fault-code report and repair recommendations. Call +971 4 380 5515 for current pricing.",
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
        question:
          "How long does Mercedes ceramic coating last in Dubai's climate?",
        answer:
          "A correctly prepped and applied ceramic coating typically lasts 3 to 5 years in Dubai when paired with proper maintenance washes. Gtechniq and similar professional coatings shrug off sun, dust and harsh wash chemicals.",
      },
      {
        question: "Do you do paint correction on Mercedes-Benz cars?",
        answer:
          "Yes. We perform single- and multi-stage machine polishing to remove swirl marks, light scratches and oxidation, then seal the finish with a ceramic coating or sealant of your choice.",
      },
    ],
  },
];

export const homeFaqs: FAQ[] = [
  {
    question: "Are you an authorised Mercedes-Benz service center?",
    answer:
      "We are an independent Mercedes-Benz specialist in Al Quoz, Dubai, not a franchised dealer. We use genuine Mercedes-Benz parts, the official XENTRY Diagnosis platform and factory service schedules so your Mercedes-Benz keeps full service-history integrity.",
  },
  {
    question: "Will using SilberArrows void my Mercedes-Benz warranty?",
    answer:
      "Yes. Independent servicing and repairs can void your Mercedes-Benz manufacturer warranty under typical warranty terms. If your vehicle is still in factory warranty, speak with your authorised dealer or Mercedes-Benz before choosing us. Many of our customers are post-warranty or have accepted that trade-off for specialist care and value; all work we perform is covered by our own 12-month warranty on parts and labour.",
  },
  {
    question: "How much do you save vs a Mercedes-Benz main dealer?",
    answer:
      "Customers typically save 30 to 40 percent on Service A, Service B and major repairs vs main-dealer pricing, with the same genuine parts and factory schedule. Our hourly labour rate is AED 375.",
  },
  {
    question: "Do you offer collection and delivery in Dubai?",
    answer:
      "Yes. Free collection and delivery across Dubai is included with every service and major repair. Just call +971 4 380 5515 or WhatsApp us to arrange a time.",
  },
  {
    question: "Where are you located?",
    answer:
      "Our workshop is on Al Manara Street in Al Quoz, Dubai. We're open Monday to Saturday, 8:00 AM to 6:00 PM.",
  },
  {
    question: "Do you service AMG, Maybach and Mercedes EQ models?",
    answer:
      "Yes. We service all Mercedes-Benz models including AMG performance cars, Maybach, and the entire Mercedes EQ electric range.",
  },
  {
    question: "Do you work on classic Mercedes-Benz models?",
    answer:
      "Yes. We specialise in classic Mercedes-Benz cars as well as modern models, from routine maintenance and mechanical rebuilds to sourcing correct parts and preserving originality where it matters.",
  },
  {
    question: "Do you offer performance tuning and RENNtech products?",
    answer:
      "Yes. We offer performance tuning and upgrades, and we are the only authorised RENNtech distributor in Dubai. You can buy and fit genuine RENNtech hardware and software through us with proper installation and support.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
