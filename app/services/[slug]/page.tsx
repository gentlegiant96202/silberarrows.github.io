import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Icon from '../../../components/Icon';
import ServiceSchema from '../../../components/ServiceSchema';
import ContactCTAButton from '../../../components/ContactCTAButton';

// Generate static params to pre-render all service pages at build time
export async function generateStaticParams() {
  return [
    { slug: 'scheduled-maintenance' },
    { slug: 'brake-service' },
    { slug: 'detailing' },
    { slug: 'battery-service' },
    { slug: 'air-conditioning' },
    { slug: 'diagnostics' },
    { slug: 'engine-repair' },
    { slug: 'suspension-repair' },
    { slug: 'tyre-replacement' },
    { slug: 'wheel-alignment' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug];
  
  if (!service) {
    return {
      title: 'Service Not Found | SilberArrows Dubai',
      description: 'The requested Mercedes-Benz service was not found.'
    };
  }

  const serviceKeywords: Record<string, string> = {
    'scheduled-maintenance': 'Mercedes scheduled maintenance Dubai, Service A Service B Dubai, Mercedes maintenance Al Quoz, official Mercedes service schedule',
    'diagnostics': 'Mercedes diagnostics Dubai, XENTRY diagnosis, Mercedes computer diagnostics, fault code reading Dubai, Mercedes ECU programming',
    'brake-service': 'Mercedes brake service Dubai, brake pad replacement, brake disc service, Mercedes brake repair Al Quoz, brake system maintenance',
    'air-conditioning': 'Mercedes A/C service Dubai, air conditioning repair, Mercedes climate control, A/C gas refill Dubai, cooling system service',
    'engine-service': 'Mercedes engine service Dubai, engine repair, Mercedes engine diagnostics, engine oil service, timing chain service Dubai',
    'suspension-repair': 'Mercedes suspension repair Dubai, shock absorber replacement, strut service, Mercedes suspension Dubai, air suspension repair',
    'detailing': 'Mercedes detailing Dubai, car detailing Al Quoz, Mercedes cleaning service, paint protection, interior detailing Dubai',
    'tyres-wheels': 'Mercedes tyre service Dubai, wheel alignment, tyre replacement, Mercedes rim repair, wheel balancing Dubai'
  };

  const shortDesc = service.description.length > 80 
    ? service.description.substring(0, 80).trim() + '...'
    : service.description;
  
  return {
    title: `${service.title} | SilberArrows Dubai`,
    description: `${service.title} for Mercedes-Benz in Dubai. ${shortDesc} Expert service at Al Quoz.`,
    keywords: serviceKeywords[slug] || `Mercedes ${slug} Dubai, Mercedes service Al Quoz, SilberArrows`,
    openGraph: {
      title: `${service.title} | SilberArrows Dubai`,
      description: `Professional ${service.title.toLowerCase()} for Mercedes-Benz vehicles in Dubai.`,
      url: `https://mercedes-benz.silberarrows.com/services/${slug}`,
      images: [{
        url: `https://mercedes-benz.silberarrows.com/assets/images/${service.heroImg}`,
        width: 640,
        height: 427,
        alt: `${service.title} - SilberArrows Dubai`,
      }],
    },
  };
}

const services: Record<string, {
  title: string;
  description: string;
  heroImg: string;
  featuresTitle?: string;
  features?: string[];
  process?: { title: string; description: string; }[];
}> = {
  'scheduled-maintenance': {
    title: 'Scheduled Maintenance – Service A & B',
    description: "Regular servicing is essential to retain your vehicle's efficiency, safety, and long-term value. We follow official Mercedes-Benz service schedules using XENTRY Diagnosis and genuine parts to maintain optimal performance and full-service history integrity.",
    heroImg: 'maintenance-640.webp',
    process: [
      { title: 'Review of service history and factory schedule', description: '' },
      { title: 'All maintenance tasks performed to factory specification', description: '' },
      { title: 'Use of Mercedes-Benz genuine oil and parts', description: '' },
      { title: "Update of your vehicle's service records and indicator reset", description: '' },
      { title: 'Technician report with maintenance recommendations', description: '' }
    ]
  },
  'brake-service': {
    title: 'Brake Service & Repair',
    description: "Your Mercedes-Benz braking system is critical to safety and performance. We conduct comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts. Whether it's routine pad replacement or complex hydraulic repairs, we ensure optimal braking performance and peace of mind, without compromising factory standards.",
    heroImg: 'brake-service-640.webp',
    featuresTitle: "What's Included",
    features: [
      'Brake pad and disc replacement',
      'Brake fluid flush and bleed',
      'Calliper and sensor inspection',
      'Electronic brake system reset'
    ],
    process: [
      { title: 'Road test to assess brake feel, noise, and response', description: '' },
      { title: 'Full inspection of pads, discs, brake lines, and callipers', description: '' },
      { title: 'Measurement of pad wear and rotor thickness', description: '' },
      { title: 'Replacement with genuine Mercedes-Benz parts; brake system bleeding and recalibration', description: '' },
      { title: 'Final safety test and technician report', description: '' }
    ]
  },
  'detailing': {
    title: 'Interior & Exterior Detailing',
    description: 'Restore your Mercedes-Benz to showroom condition with our professional detailing services. We use premium, vehicle-safe products tailored to Mercedes-Benz interiors, leather, and paint systems. From multi-stage polishing to optional ceramic coatings, our detailing protects your investment and enhances resale value.',
    heroImg: 'detailing-640.webp',
    featuresTitle: 'What\'s Included',
    features: [
      'Snow foam wash and paint correction',
      'Ceramic coating (optional)',
      'Interior shampoo and leather care',
      'Engine bay and alloy wheel detailing'
    ],
    process: [
      { title: 'Pre-wash and paintwork decontamination', description: '' },
      { title: 'Clay bar treatment to remove embedded contaminants', description: '' },
      { title: 'Machine polishing to eliminate swirl marks and defects', description: '' },
      { title: 'Deep interior cleaning and leather conditioning', description: '' },
      { title: 'Optional: Application of paint sealants or Gtechniq ceramic protection', description: '' }
    ]
  },
  'battery-service': {
    title: 'Battery Testing & Replacement',
    description: 'Modern Mercedes-Benz models rely heavily on electrical systems. Our battery services ensure reliable starts and prevent electrical issues. We install original Mercedes-Benz batteries and perform full electronic registration with your vehicle\'s control units.',
    heroImg: 'battery-640.webp',
    featuresTitle: 'Services Include',
    features: [
      'Battery load and voltage test',
      'Charging system and alternator inspection',
      'Battery replacement and ECU registration'
    ],
    process: [
      { title: 'Battery and charging system assessment', description: '' },
      { title: 'Inspection of terminals, grounds, and cables', description: '' },
      { title: 'Professional removal and disposal of old unit', description: '' },
      { title: 'Installation of original Mercedes-Benz battery and software registration', description: '' },
      { title: 'System test to verify electrical readiness', description: '' }
    ]
  },
  'air-conditioning': {
    title: 'Air Conditioning Service & Repair',
    description: 'A properly functioning A/C system ensures cabin comfort and air quality. We service all Mercedes-Benz refrigerant types (R134a & R1234yf), replacing filters, diagnosing leaks, and restoring performance.',
    heroImg: 'Air-conditioning-640.webp',
    featuresTitle: 'Services Include',
    features: [
      'Refrigerant recovery, refill, and leak detection',
      'Compressor, condenser, and evaporator check',
      'Cabin filter replacement',
      'Disinfection and odour treatment'
    ],
    process: [
      { title: 'System pressure and leak test', description: '' },
      { title: 'Blower, condenser, and filter inspection', description: '' },
      { title: 'Refrigerant evacuation and refill to correct spec', description: '' },
      { title: 'Disinfection of air ducts and evaporator housing', description: '' },
      { title: 'Final cooling performance verification', description: '' }
    ]
  },
  'diagnostics': {
    title: 'Electrical & Computer Diagnostics',
    description: 'Mercedes-Benz vehicles feature advanced electronics across all systems. Using XENTRY Diagnosis, the official Mercedes-Benz diagnostic platform, we identify and resolve issues with ECUs, control modules, sensors, and wiring faults.',
    heroImg: 'diagnostics-640.webp',
    featuresTitle: 'Diagnostic Capabilities',
    features: [
      'XENTRY Diagnosis system fault scanning',
      'ECU resets and software updates',
      'Sensor testing and wiring repairs'
    ],
    process: [
      { title: 'Full vehicle scan using XENTRY Diagnosis to retrieve fault codes', description: '' },
      { title: 'Systematic analysis based on manufacturer data', description: '' },
      { title: 'Testing and repair of components and wiring harnesses', description: '' },
      { title: 'Software updates and clearing of fault memory', description: '' },
      { title: 'Final verification and detailed diagnostic report', description: '' }
    ]
  },
  'engine-repair': {
    title: 'Engine Repair & Overhaul',
    description: 'We handle everything from minor engine issues to complete overhauls using factory repair methods and genuine parts. Common services include timing component replacement, gasket and seal replacement, and turbocharger diagnosis and replacement, all performed to restore smooth performance, emissions compliance, and long-term reliability.',
    heroImg: 'ENGINE-640.webp',
    featuresTitle: 'Common Repairs',
    features: [
      'Timing chain and tensioner replacement',
      'Cylinder head gasket and seal replacement',
      'Turbocharger diagnosis and replacement',
      'Full engine disassembly and rebuilds'
    ],
    process: [
      { title: 'Diagnostic testing (compression test, leak-down test, oil analysis)', description: '' },
      { title: 'Dismantling and inspection of affected components', description: '' },
      { title: 'Replacement with genuine Mercedes-Benz parts and precise reassembly', description: '' },
      { title: 'ECU recalibration and post-repair leak and performance testing', description: '' },
      { title: 'Final road test and detailed engine condition report', description: '' }
    ]
  },
  'suspension-repair': {
    title: 'Suspension & Steering Repair',
    description: 'Suspension comfort and steering precision are hallmarks of a Mercedes-Benz. We specialise in both conventional and advanced systems including AIRMATIC and ABC (Active Body Control), using genuine Mercedes-Benz parts for all repairs and replacements.',
    heroImg: 'suspension-640.webp',
    featuresTitle: 'We Handle',
    features: [
      'Shock absorber and strut replacement',
      'Air suspension leak repair and compressor service',
      'Control arm and bushing replacement',
      'Steering rack and power steering system repairs'
    ],
    process: [
      { title: 'Road test to evaluate handling and ride quality', description: '' },
      { title: 'Inspection of suspension components and ride height sensors', description: '' },
      { title: 'Replacement of worn or faulty parts using genuine Mercedes-Benz parts', description: '' },
      { title: 'Calibration of electronic suspension systems and ride height adjustment', description: '' },
      { title: 'Final road test to confirm handling and comfort restoration', description: '' }
    ]
  },
  'tyre-replacement': {
    title: 'Tyre Replacement & Balancing',
    description: 'Proper tyres are crucial for safety, performance, and comfort. We supply and fit Mercedes-Benz-approved tyres, including run-flats and AMG-specific sizes, and calibrate TPMS sensors to factory standards.',
    heroImg: 'tyres-640.webp',
    featuresTitle: 'What\'s Included',
    features: [
      'Tyre fitting and wheel balancing',
      'TPMS sensor calibration and reprogramming',
      'Run-flat and performance tyre options'
    ],
    process: [
      { title: 'Inspection of existing tyres for wear and damage', description: '' },
      { title: 'Selection and fitting of appropriate replacement tyres', description: '' },
      { title: 'Dynamic wheel balancing to prevent vibrations', description: '' },
      { title: 'TPMS sensor reset or programming as required', description: '' },
      { title: 'Test drive to ensure correct fit and performance', description: '' }
    ]
  },
  'wheel-alignment': {
    title: 'Wheel Alignment',
    description: 'Precise wheel alignment is essential for steering accuracy, even tyre wear, and overall vehicle stability. We use Hunter 3D laser alignment systems, officially approved by Mercedes-Benz, to perform accurate adjustments on all models, including AMG and 4MATIC variants.',
    heroImg: 'wheel-alignment-640.webp',
    featuresTitle: 'What\'s Included',
    features: [
      'Four-wheel laser alignment',
      'Steering angle sensor recalibration',
      'Pre- and post-alignment reports'
    ],
    process: [
      { title: 'Visual inspection and measurement of wheel alignment angles', description: '' },
      { title: 'Mounting on alignment platform with sensor attachment', description: '' },
      { title: 'Adjustment of toe, camber, and caster angles to Mercedes-Benz specifications', description: '' },
      { title: 'Steering angle sensor reset to avoid warning lights', description: '' },
      { title: 'Documentation of alignment results before and after adjustment', description: '' }
    ]
  },
};

// Get related services for a given slug
function getRelatedServices(currentSlug: string) {
  const allSlugs = Object.keys(services);
  const related = allSlugs
    .filter(s => s !== currentSlug)
    .slice(0, 4);
  return related.map(slug => ({ slug, ...services[slug] }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return notFound();

  const relatedServices = getRelatedServices(slug);
  const isScheduledMaintenance = slug === 'scheduled-maintenance';

  return (
    <>
      <ServiceSchema 
        serviceName={service.title}
        serviceDescription={service.description}
        serviceSlug={slug}
      />
      <Header />
      <main>
        {/* === HERO (Dark) === */}
        <section className="sd-hero" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('/assets/images/${service.heroImg}')`,
        }}>
          <div className="sd-hero-inner">
            <Link href="/services" className="sd-breadcrumb">
              <span>Services</span>
              <span className="sd-breadcrumb-sep">/</span>
            </Link>
            <h1 className="sd-hero-title">{service.title}</h1>
          </div>
        </section>

        {/* === OVERVIEW (Light) === */}
        <section className="sd-overview">
          <div className="sd-container">
            <h2 className="sd-section-label">Overview</h2>
            <p className="sd-description">{service.description}</p>
          </div>
        </section>

        {/* === FEATURES / TABLE (Light) === */}
        {isScheduledMaintenance ? (
          <section className="sd-features-section">
            <div className="sd-container">
              <h2 className="sd-section-label">Service Comparison</h2>
              <div className="sd-comparison-table">
                <div className="sd-table-header">
                  <div className="sd-table-feature-col">{"What's Included"}</div>
                  <div className="sd-table-pkg-col">
                    <span className="sd-pkg-name">Service A</span>
                    <span className="sd-pkg-type">Minor</span>
                  </div>
                  <div className="sd-table-pkg-col sd-pkg-premium">
                    <span className="sd-pkg-name">Service B</span>
                    <span className="sd-pkg-type">Major</span>
                  </div>
                </div>
                {[
                  { name: 'Engine oil, oil filter, and air filter replacement', a: true, b: true },
                  { name: 'Check and top-up of all fluids', a: true, b: true },
                  { name: 'Visual inspection of underbody, engine bay, brakes, and tyres', a: true, b: true },
                  { name: 'Diagnostics check using XENTRY Diagnosis', a: true, b: true },
                  { name: 'Maintenance counter reset and full valet', a: true, b: true },
                  { name: 'Dust or combination filter replacement', a: false, b: true },
                  { name: 'A/C system treatment', a: false, b: true },
                  { name: 'Wheel rotation and spare wheel or TIREFIT sealant check', a: false, b: true },
                  { name: 'Transmission Oil Change + Filter Replacement', a: false, b: true },
                  { name: 'Full Vehicle Inspection', a: true, b: true },
                ].map((row, i) => (
                  <div className="sd-table-row" key={i}>
                    <div className="sd-table-feature">{row.name}</div>
                    <div className="sd-table-val">{row.a ? <Icon name="check" size={16} variant="gold" /> : <span className="sd-dash">—</span>}</div>
                    <div className="sd-table-val">{row.b ? <Icon name="check" size={16} variant="gold" /> : <span className="sd-dash">—</span>}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : service.features ? (
          <section className="sd-features-section">
            <div className="sd-container">
              <h2 className="sd-section-label">{service.featuresTitle || "What's Included"}</h2>
              <div className="sd-features-grid">
                {service.features.map((feature, i) => (
                  <div className="sd-feature-item" key={i}>
                    <div className="sd-feature-icon">
                      <Icon name="check" size={18} variant="gold" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* === PROCESS (Dark) === */}
        {service.process && (
          <section className="sd-process-section">
            <div className="sd-container">
              <h2 className="sd-section-label sd-label-light">Our Process</h2>
              <div className="sd-process-grid">
                {service.process.map((step, i) => (
                  <div className="sd-process-step" key={i}>
                    <div className="sd-step-num">{String(i + 1).padStart(2, '0')}</div>
                    <p className="sd-step-text">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* === CTA (Light) === */}
        <section className="sd-cta-section">
          <div className="sd-container sd-cta-inner">
            <h2 className="sd-cta-title">Ready to Book?</h2>
            <p className="sd-cta-sub">Speak with our Mercedes-Benz specialists today.</p>
            <ContactCTAButton variant="primary" size="large" iconName="whatsapp">Get a Free Quote</ContactCTAButton>
          </div>
        </section>

        {/* === RELATED SERVICES (Light) === */}
        <section className="sd-related-section">
          <div className="sd-container">
            <h2 className="sd-section-label">Other Services</h2>
            <div className="sd-related-grid">
              {relatedServices.map((rs) => (
                <Link href={`/services/${rs.slug}`} className="sd-related-card" key={rs.slug}>
                  <div className="sd-related-img" style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/assets/images/${rs.heroImg}')`,
                  }} />
                  <div className="sd-related-body">
                    <h3>{rs.title}</h3>
                    <span className="sd-related-arrow">View Service &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div style={{ height: '120px' }} />
      </main>
      <Footer />
    </>
  );
}
