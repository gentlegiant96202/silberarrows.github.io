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
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
