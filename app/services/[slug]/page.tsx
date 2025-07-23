import React from 'react';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Icon from '../../../components/Icon';

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
      { title: 'Update of your vehicle\'s service records and indicator reset', description: '' },
      { title: 'Technician report with maintenance recommendations', description: '' }
    ]
  },
  'brake-service': {
    title: 'Brake Service & Repair',
    description: 'Your Mercedes-Benz braking system is critical to safety and performance. We conduct comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts. Whether it\'s routine pad replacement or complex hydraulic repairs, we ensure optimal braking performance and peace of mind, without compromising factory standards.',
    heroImg: 'brake-service-640.webp',
    featuresTitle: 'What\'s Included',
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
            
            <div className="content-grid">
              {/* Left column */}
              <div className="content-section">
                <h2 className="section-title">{service.featuresTitle || 'What\'s Included'}</h2>
                
                {slug === 'scheduled-maintenance' ? (
                  <>
                    <div className="service-plans">
                      <div className="plan-item">
                        <h3 className="plan-title">Service A (Minor Service)</h3>
                        <ul className="plan-features">
                          <li><Icon name="check" size={16} variant="gold" /> Engine oil, oil filter, and air filter replacement</li>
                          <li><Icon name="check" size={16} variant="gold" /> Check and top-up of all fluids</li>
                          <li><Icon name="check" size={16} variant="gold" /> Visual inspection of underbody, engine bay, brakes, and tyres</li>
                          <li><Icon name="check" size={16} variant="gold" /> Diagnostics check using XENTRY Diagnosis</li>
                          <li><Icon name="check" size={16} variant="gold" /> Maintenance counter reset and full valet</li>
                        </ul>
                      </div>

                      <div className="plan-item">
                        <h3 className="plan-title">Service B (Major Service)</h3>
                        <p className="plan-subtitle">Includes all Service A items, plus:</p>
                        <ul className="plan-features">
                          <li><Icon name="check" size={16} variant="gold" /> Dust or combination filter replacement</li>
                          <li><Icon name="check" size={16} variant="gold" /> A/C system treatment</li>
                          <li><Icon name="check" size={16} variant="gold" /> Wheel rotation and spare wheel or TIREFIT sealant check</li>
                          <li><Icon name="check" size={16} variant="gold" /> Additional safety checks and updates</li>
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {service.features && (
                      <ul className="plan-features">
                        {service.features.map((feature, index) => (
                          <li key={index}>
                            <Icon name="check" size={16} variant="gold" /> {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>

              {/* Right column */}
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