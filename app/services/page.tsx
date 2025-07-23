import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Services Section */}
        <div className="services-section" id="services">
          <div className="section-header">
            <h2>OUR SERVICES</h2>
            <p>Comprehensive Mercedes-Benz maintenance and repair services by certified technicians</p>
          </div>
          <div className="services-layout">
            <nav className="services-nav"><ul></ul></nav>
            <div className="service-card-display">
              {/* 10 service panes (identical to home page) */}
              <div className="service-pane" data-service="scheduled-maintenance" id="scheduled-maintenance">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/maintenance-320.avif 320w, /assets/images/maintenance-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/maintenance-320.webp 320w, /assets/images/maintenance-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/maintenance-640.webp" alt="Scheduled Maintenance" width="640" height="427" loading="eager" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Scheduled Maintenance</h3>
                    <p>Regular servicing is essential to retain your vehicle&apos;s efficiency, safety, and long-term value.</p>
                    <Link href="/services/scheduled-maintenance/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="brake-service" id="brake-service">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/brake-service-320.avif 320w, /assets/images/brake-service-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/brake-service-320.webp 320w, /assets/images/brake-service-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/brake-service-640.webp" alt="Brake Service" width="640" height="427" loading="eager" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Brake Service &amp; Repair</h3>
                    <p>Comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts.</p>
                    <Link href="/services/brake-service/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="tyre-replacement" id="tyre-replacement">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/tyres-320.avif 320w, /assets/images/tyres-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/tyres-320.webp 320w, /assets/images/tyres-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/tyres-640.webp" alt="Tyre Replacement" width="640" height="427" loading="eager" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Tyre Replacement &amp; Balancing</h3>
                    <p>We supply and fit Mercedes-Benz-approved tyres, including run-flats and AMG-specific sizes.</p>
                    <Link href="/services/tyre-replacement/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="wheel-alignment" id="wheel-alignment">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/wheel-alignment-320.avif 320w, /assets/images/wheel-alignment-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/wheel-alignment-320.webp 320w, /assets/images/wheel-alignment-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/wheel-alignment-640.webp" alt="Wheel Alignment" width="640" height="427" loading="lazy" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Wheel Alignment</h3>
                    <p>Precise wheel alignment for steering accuracy, even tyre wear, and overall vehicle stability.</p>
                    <Link href="/services/wheel-alignment/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="battery-replacement" id="battery-replacement">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/battery-320.avif 320w, /assets/images/battery-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/battery-320.webp 320w, /assets/images/battery-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/battery-640.webp" alt="Battery Service" width="640" height="427" loading="lazy" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Battery Testing &amp; Replacement</h3>
                    <p>Our battery services ensure reliable starts and prevent electrical issues.</p>
                    <Link href="/services/battery-service/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="ac-service" id="ac-service">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/Air-conditioning-320.avif 320w, /assets/images/Air-conditioning-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/Air-conditioning-320.webp 320w, /assets/images/Air-conditioning-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/Air-conditioning-640.webp" alt="Air Conditioning Service" width="640" height="427" loading="lazy" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Air Conditioning Service &amp; Repair</h3>
                    <p>A properly functioning A/C system ensures cabin comfort and optimal air quality.</p>
                    <Link href="/services/air-conditioning/" className="read-more-btn">Learn More</Link> 
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="engine-repair" id="engine-repair">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <img src="/assets/images/ENGINE.webp" alt="Engine Repair" />
                  </div>
                  <div className="service-card-content">
                    <h3>Engine Repair &amp; Overhaul</h3>
                    <p>From minor engine issues to complete overhauls using factory repair methods.</p>
                    <Link href="/services/engine-repair/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="suspension-repair" id="suspension-repair">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/suspension-320.avif 320w, /assets/images/suspension-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/suspension-320.webp 320w, /assets/images/suspension-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/suspension-640.webp" alt="Suspension Repair" width="640" height="427" loading="lazy" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Suspension &amp; Steering Repair</h3>
                    <p>We specialise in both conventional and advanced systems including AIRMATIC and ABC.</p>
                    <Link href="/services/suspension-repair/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="diagnostics" id="diagnostics">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/diagnostics-320.avif 320w, /assets/images/diagnostics-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/diagnostics-320.webp 320w, /assets/images/diagnostics-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/diagnostics-640.webp" alt="Diagnostics" width="640" height="427" loading="lazy" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Electrical &amp; Computer Diagnostics</h3>
                    <p>We identify and resolve issues with ECUs, control modules, sensors, and wiring faults.</p>
                    <Link href="/services/diagnostics/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
              <div className="service-pane" data-service="detailing" id="detailing">
                <div className="service-card service-card--has-image">
                  <div className="service-card-image">
                    <picture>
                      <source type="image/avif" srcSet="/assets/images/detailing-320.avif 320w, /assets/images/detailing-640.avif 640w" sizes="(max-width:600px) 320px, 640px" />
                      <source type="image/webp" srcSet="/assets/images/detailing-320.webp 320w, /assets/images/detailing-640.webp 640w" sizes="(max-width:600px) 320px, 640px" />
                      <img src="/assets/images/detailing-640.webp" alt="Detailing" width="640" height="427" loading="lazy" />
                    </picture>
                  </div>
                  <div className="service-card-content">
                    <h3>Interior &amp; Exterior Detailing</h3>
                    <p>Restore your Mercedes-Benz to showroom condition with our professional detailing services.</p>
                    <Link href="/services/detailing/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 