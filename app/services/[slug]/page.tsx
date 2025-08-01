import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Icon from '../../../components/Icon';
import ServiceSchema from '../../../components/ServiceSchema';

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

  return {
    title: `${service.title} | SilberArrows Mercedes Service Dubai`,
    description: `Professional ${service.title.toLowerCase()} for Mercedes-Benz in Dubai. ${service.description.substring(0, 120)}... Expert service at Al Quoz.`,
    keywords: serviceKeywords[slug] || `Mercedes ${slug} Dubai, Mercedes service Al Quoz, SilberArrows`,
    openGraph: {
      title: `${service.title} | SilberArrows Dubai`,
      description: `Professional ${service.title.toLowerCase()} for Mercedes-Benz vehicles in Dubai.`,
      url: `https://mercedes-benz.silberarrows.com/services/${slug}`,
    },
  };
}

// Simple data map (can be expanded later or fetched from CMS)
const services: Record<string, {
  title: string;
  description: string;
  heroImg: string; // path inside /public/assets/images
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

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services[slug];
  if (!service) return notFound();

  // Full-layout page for all services
  if (service.features || service.process) {
    return (
      <>
        <ServiceSchema 
          serviceName={service.title}
          serviceDescription={service.description}
          serviceSlug={slug}
        />
        <Header />
        <main>
          {/* Compact Hero */}
          <section className="compact-hero" style={{
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/images/${service.heroImg}') center/cover no-repeat fixed`,
          }}>
            <div className="hero-content">
              <h1 className="hero-title">{service.title}</h1>
            </div>
          </section>

          {/* Main Content */}
          <div className="main-content">
            {/* Overview Section */}
            <div className="content-section" style={{ marginBottom: '3rem' }}>
              <h2 className="section-title">Overview</h2>
              <p className="section-description">{service.description}</p>
            </div>
            
            {slug === 'scheduled-maintenance' ? (
              <>
                {/* Service Comparison Table - Full Width */}
                <div className="content-section">
                  <h2 className="section-title">{service.featuresTitle || "What's Included"}</h2>
                  <div className="service-comparison-table">
                    <div className="service-table-header">
                      <div className="service-feature-column-header">{"What's Included"}</div>
                      <div className="service-package-column">
                        <div className="service-package-name">Service A</div>
                        <div className="service-package-description">Minor Service</div>
                      </div>
                      <div className="service-package-column premium">
                        <div className="service-package-name">Service B</div>
                        <div className="service-package-description">Major Service</div>
                      </div>
                    </div>
                    
                    <div className="service-table-body">
                      <div className="service-feature-row">
                        <div className="service-feature-name">Engine oil, oil filter, and air filter replacement</div>
                        <div className="service-feature-value" data-service="Service A"><Icon name="check" size={16} variant="gold" /></div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">Check and top-up of all fluids</div>
                        <div className="service-feature-value" data-service="Service A"><Icon name="check" size={16} variant="gold" /></div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">Visual inspection of underbody, engine bay, brakes, and tyres</div>
                        <div className="service-feature-value" data-service="Service A"><Icon name="check" size={16} variant="gold" /></div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">Diagnostics check using XENTRY Diagnosis</div>
                        <div className="service-feature-value" data-service="Service A"><Icon name="check" size={16} variant="gold" /></div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">Maintenance counter reset and full valet</div>
                        <div className="service-feature-value" data-service="Service A"><Icon name="check" size={16} variant="gold" /></div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">Dust or combination filter replacement</div>
                        <div className="service-feature-value not-included" data-service="Service A">—</div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">A/C system treatment</div>
                        <div className="service-feature-value not-included" data-service="Service A">—</div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">Wheel rotation and spare wheel or TIREFIT sealant check</div>
                        <div className="service-feature-value not-included" data-service="Service A">—</div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                      <div className="service-feature-row">
                        <div className="service-feature-name">Additional safety checks and updates</div>
                        <div className="service-feature-value not-included" data-service="Service A">—</div>
                        <div className="service-feature-value" data-service="Service B"><Icon name="check" size={16} variant="gold" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Features Section - Full Width */}
                <div className="content-section">
                  <h2 className="section-title">{service.featuresTitle || 'What\'s Included'}</h2>
                  {service.features && (
                    <ul className="plan-features">
                      {service.features.map((feature, index) => (
                        <li key={index}>
                          <Icon name="check" size={16} variant="gold" /> {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}

            {/* Process Section - Full Width for ALL services */}
            <div className="content-section process-section">
              <h2 className="section-title">Our Process</h2>
              <div className="process-steps">
                {(service.process || [
                  { title: 'Service History Review', description: 'Review of service history and factory schedule' },
                  { title: 'Factory Specification', description: 'All maintenance tasks performed to factory specification' },
                  { title: 'Genuine Parts & Oil', description: 'Use of Mercedes-Benz genuine oil and parts' },
                  { title: 'Records Update', description: 'Update of your vehicle\'s service records and indicator reset' },
                  { title: 'Technician Report', description: 'Technician report with maintenance recommendations' },
                ]).map((step, idx) => (
                  <div className="process-step" key={idx}>
                    <div className="step-number">{idx + 1}</div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      {step.description && <p>{step.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Related Services Section - For ALL services */}
          <div className="related-services-section">
            <div className="main-content">
              <h2 className="section-title related-title">Related Services</h2>
              <div className="related-services-grid">
                {slug === 'scheduled-maintenance' ? (
                  <>
                    <Link href="/services/diagnostics" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Electrical & Computer Diagnostics</h3>
                        <p>Complete your service with professional diagnostics using XENTRY Diagnosis system.</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/brake-service" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Brake Service & Repair</h3>
                        <p>Often recommended during major service - brake inspection and maintenance.</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/air-conditioning" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Air Conditioning Service & Repair</h3>
                        <p>Perfect add-on service - A/C system check and refrigerant service.</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/battery-service" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Battery Testing & Replacement</h3>
                        <p>Ensure reliable starts with battery testing and genuine Mercedes replacement.</p>
                      </div>
                    </Link>
                  </>
                ) : slug === 'brake-service' ? (
                  <>
                    <Link href="/services/scheduled-maintenance" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Scheduled Maintenance – Service A & B</h3>
                        <p>{"Regular servicing is essential to retain your vehicle's efficiency, safety, and long-term value."}</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/wheel-alignment" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Wheel Alignment</h3>
                        <p>Precise wheel alignment is essential for steering accuracy, even tyre wear, and overall vehicle stability.</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/tyre-replacement" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Tyre Replacement & Balancing</h3>
                        <p>Proper tyres are crucial for safety, performance, and comfort.</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/diagnostics" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Electrical & Computer Diagnostics</h3>
                        <p>Mercedes-Benz vehicles feature advanced electronics across all systems.</p>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/services/scheduled-maintenance" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Scheduled Maintenance – Service A & B</h3>
                        <p>{"Regular servicing is essential to retain your vehicle's efficiency, safety, and long-term value."}</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/diagnostics" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Electrical & Computer Diagnostics</h3>
                        <p>Mercedes-Benz vehicles feature advanced electronics across all systems.</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/brake-service" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Brake Service & Repair</h3>
                        <p>Your Mercedes-Benz braking system is critical to safety and performance.</p>
                      </div>
                    </Link>
                    
                    <Link href="/services/air-conditioning" className="related-service-card">
                      <div className="related-card-content">
                        <h3>Air Conditioning Service & Repair</h3>
                        <p>A properly functioning A/C system ensures cabin comfort and air quality.</p>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Spacer for fixed footer */}
          <div style={{ height: '120px' }}></div>
        </main>
        <Footer />
      </>
    );
  }

  // Generic layout for other services
  return (
    <>
      <ServiceSchema 
        serviceName={service.title}
        serviceDescription={service.description}
        serviceSlug={slug}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="service-detail-hero" style={{
          background: `linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.65)), url('/assets/images/${service.heroImg}') center/cover no-repeat`,
          padding: '140px 0 100px',
          textAlign: 'center',
        }}>
          <h1 className="service-detail-title">{service.title}</h1>
          <p className="service-detail-sub">{service.description}</p>
        </section>
 
        {/* Placeholder for additional copy if needed */}
        {false && (
          <section className="service-detail-copy">
            <div className="container">
              <h2 className="detail-heading">Overview</h2>
              <p>Regular servicing is essential to retain your vehicle’s efficiency, safety, and long-term value. We follow official Mercedes-Benz service schedules using XENTRY Diagnosis and genuine parts to maintain optimal performance and full-service history integrity.</p>

              <h3 className="detail-subheading">Service&nbsp;A <span className="minor-label">(Minor Service)</span></h3>
              <ul className="detail-list">
                <li>Engine oil, oil filter, and air filter replacement</li>
                <li>Check and top-up of all fluids</li>
                <li>Visual inspection of underbody, engine bay, brakes, and tyres</li>
                <li>Diagnostics check using XENTRY Diagnosis</li>
                <li>Maintenance counter reset and full valet</li>
              </ul>

              <h3 className="detail-subheading">Service&nbsp;B <span className="major-label">(Major Service)</span></h3>
              <p>Includes all Service&nbsp;A items, plus:</p>
              <ul className="detail-list">
                <li>Dust or combination filter replacement</li>
                <li>A/C system treatment</li>
                <li>Wheel rotation and spare wheel or TIREFIT sealant check</li>
                <li>Additional safety checks and updates</li>
              </ul>

              <h3 className="detail-subheading">Our Process</h3>
              <ol className="detail-steps">
                <li>Review of service history and factory schedule</li>
                <li>All maintenance tasks performed to factory specification</li>
                <li>Use of Mercedes-Benz genuine oil and parts</li>
                <li>Update of your vehicle’s service records and indicator reset</li>
                <li>Technician report with maintenance recommendations</li>
              </ol>
            </div>
          </section>
        )}

        {/* Simple CTA */}
        <section className="contact-section" id="contact">
          <div className="contact-content">
            <div className="contact-header">
              <h2>BOOK YOUR {service.title.toUpperCase()}</h2>
              <p>Call us or WhatsApp now for a free quote.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 