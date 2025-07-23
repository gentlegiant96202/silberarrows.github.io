'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMedal } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function HomePage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.onload = () => {
      setHeroLoaded(true);
    };
    img.src = '/assets/images/hero-bg-silver-optimized.avif';
  }, []);

  useEffect(() => {
    function initServicesPageNavigation() {
      const servicesNav = document.querySelector('.services-nav ul');
      const servicePanes = document.querySelectorAll('.service-pane');
      if (!servicesNav || !servicePanes.length) return false;
      servicesNav.innerHTML = '';
      const serviceData: Record<string, { title: string; mobileTitle: string }> = {
        'scheduled-maintenance': { title: 'Maintenance', mobileTitle: 'Maintenance' },
        'brake-service': { title: 'Brake Service', mobileTitle: 'Brakes' },
        'tyre-replacement': { title: 'Tyre Service', mobileTitle: 'Tyres' },
        'wheel-alignment': { title: 'Wheel Alignment', mobileTitle: 'Alignment' },
        'battery-replacement': { title: 'Battery Service', mobileTitle: 'Battery' },
        'ac-service': { title: 'Air Conditioning', mobileTitle: 'A/C' },
        'engine-repair': { title: 'Engine Repair', mobileTitle: 'Engine' },
        'suspension-repair': { title: 'Suspension', mobileTitle: 'Suspension' },
        'diagnostics': { title: 'Diagnostics', mobileTitle: 'Diagnostics' },
        'detailing': { title: 'Detailing', mobileTitle: 'Detailing' }
      };
      servicePanes.forEach((pane, index) => {
        const serviceKey = pane.getAttribute('data-service') as string;
        const info = serviceData[serviceKey];
        if (!info) return;
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.setAttribute('data-service', serviceKey);
        button.textContent = info.mobileTitle || info.title;
        if (index === 0) {
          button.classList.add('active');
          pane.classList.add('active');
        }
        li.appendChild(button);
        servicesNav.appendChild(li);
        button.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelectorAll('.services-nav button').forEach((btn) => btn.classList.remove('active'));
          document.querySelectorAll('.service-pane').forEach((p) => p.classList.remove('active'));
          button.classList.add('active');
          document.getElementById(serviceKey)?.classList.add('active');
        });
      });
      setTimeout(() => document.querySelector('.services-nav')?.classList.add('animate-in'), 100);
      return true;
    }
    function tryInit(attempt = 0) {
      if (initServicesPageNavigation()) return;
      if (attempt < 10) setTimeout(() => tryInit(attempt + 1), 200);
    }
    tryInit();
  }, []);
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={`hero${heroLoaded ? ' hero-loaded' : ''}`}>
          <div className="hero-content">
            <div className="hero-logo">
              <img src="/assets/icons/silberarrows-logo.png" alt="Silver Arrows Logo" className="hero-logo-img" />
            </div>
            <div className="hero-tagline">Exclusive Automotive Excellence</div>
            <h1 className="hero-title">Independent<br /><span>Mercedes-Benz</span><br />Service Centre<br />in Dubai</h1>
            <p className="hero-subtitle">Exclusively Servicing Mercedes-Benz Only.<br />Our trusted name ensures a service record from us<br />retains your vehicle&apos;s value.</p>
            <div className="hero-cta-container">
              <button className="hero-cta quote-trigger"><span>GET A FREE QUOTE</span></button>
              <div className="hero-contact-actions">
                <a href="tel:+97143805515" className="hero-action"><FontAwesomeIcon icon={faPhone as IconProp} /><span>+971 4 380 5515</span></a>
                <a href="https://wa.me/97143805515" className="hero-action"><FontAwesomeIcon icon={faWhatsapp as IconProp} /><span>WhatsApp Us</span></a>
              </div>
            </div>
            <div className="year-badge"><FontAwesomeIcon icon={faMedal as IconProp} />Setting the Standard since 2011</div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <div className="why-choose-us-content">
            <div className="section-header">
              <h2>WHY CHOOSE US?</h2>
              <p>With over a decade of dedicated experience, we provide unparalleled expertise and premium service exclusively for Mercedes-Benz owners in Dubai.</p>
            </div>
            <div className="features-columns">
              <div className="feature-column">
                <div className="feature-card">
                  <div className="feature-icon"><i className="fas fa-cogs"></i></div>
                  <div className="feature-content">
                    <h3>GENUINE PARTS<span className="mobile-hide"> & FACTORY STANDARDS</span></h3>
                    <p>Only genuine Mercedes-Benz parts, fitted using manufacturer-approved tools and procedures.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="fas fa-star"></i></div>
                  <div className="feature-content">
                    <h3>EXCLUSIVE TO MERCEDES-BENZ</h3>
                    <p>We work on one marque only, Mercedes-Benz. That&apos;s where our expertise lies.</p>
                  </div>
                </div>
              </div>
              <div className="feature-column">
                <div className="feature-card">
                  <div className="feature-icon"><i className="fas fa-user-shield"></i></div>
                  <div className="feature-content">
                    <h3>FACTORY-TRAINED TECHNICIANS</h3>
                    <p>Certified technicians trained to Mercedes-Benz standards with over seven decades of combined hands-on experience.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="fas fa-file-contract"></i></div>
                  <div className="feature-content">
                    <h3>SERVICE CONTRACTS</h3>
                    <p>Comprehensive maintenance packages designed to keep your Mercedes-Benz in peak condition with premium care.</p>
                  </div>
                </div>
              </div>
              <div className="feature-column">
                <div className="feature-card">
                  <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                  <div className="feature-content">
                    <h3>12-MONTH WARRANTY</h3>
                    <p>All work is backed by a full 12-month warranty for your peace of mind.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><i className="fas fa-truck"></i></div>
                  <div className="feature-content">
                    <h3>FREE COLLECTION & DELIVERY</h3>
                    <p>Complimentary vehicle collection and delivery across Dubai.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <div className="services-section" id="services">
          <div className="section-header">
            <h2>OUR SERVICES</h2>
            <p>Specialised Mercedes-Benz solutions delivered with precision and expertise</p>
          </div>
          <div className="services-layout">
            <nav className="services-nav">
              <ul></ul>
            </nav>
            <div className="service-card-display">
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
                    <h3>Brake Service & Repair</h3>
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
                    <h3>Tyre Replacement & Balancing</h3>
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
                    <h3>Battery Testing & Replacement</h3>
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
                    <h3>Air Conditioning Service & Repair</h3>
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
                    <h3>Engine Repair & Overhaul</h3>
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
                    <h3>Suspension & Steering Repair</h3>
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
                    <h3>Electrical & Computer Diagnostics</h3>
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
                    <h3>Interior & Exterior Detailing</h3>
                    <p>Restore your Mercedes-Benz to showroom condition with our professional detailing services.</p>
                    <Link href="/services/detailing/" className="read-more-btn">Learn More</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <div className="section-header">
              <h2>Meet Our Service Team</h2>
              <p>Experienced professionals dedicated to keeping your Mercedes-Benz in perfect condition.</p>
            </div>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-member-image">
                  <img src="/assets/images/DAN-1_02.webp" alt="Daniel Harrison" loading="lazy" />
                  <div className="team-overlay">
                    <div className="team-overlay-content">
                      <p>Leading our service operations with over 15 years of Mercedes-Benz expertise.</p>
                    </div>
                  </div>
                </div>
                <div className="team-member-info">
                  <h3>Daniel Harrison</h3>
                  <p className="team-designation">Head of Service</p>
                  <div className="team-speciality">Certified Mercedes-Benz Technician</div>
                </div>
              </div>
              <div className="team-member">
                <div className="team-member-image">
                  <img src="/assets/images/LUSY-2_02.webp" alt="Lucy Woroniak" loading="lazy" />
                  <div className="team-overlay">
                    <div className="team-overlay-content">
                      <p>Dedicated to providing exceptional customer service and technical support.</p>
                    </div>
                  </div>
                </div>
                <div className="team-member-info">
                  <h3>Lucy Woroniak</h3>
                  <p className="team-designation">Service Advisor</p>
                  <div className="team-speciality">Certified Service Advisor</div>
                </div>
              </div>
              <div className="team-member">
                <div className="team-member-image">
                  <img src="/assets/images/ESSRAR-3_02.webp" alt="Essrar Ali" loading="lazy" />
                  <div className="team-overlay">
                    <div className="team-overlay-content">
                      <p>Expert in customer relations and comprehensive service coordination.</p>
                    </div>
                  </div>
                </div>
                <div className="team-member-info">
                  <h3>Essrar Ali</h3>
                  <p className="team-designation">Service Advisor</p>
                  <div className="team-speciality">Certified Service Advisor</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Contracts Section */}
        <section className="service-contracts-section">
          <div className="contracts-container">
            <div className="section-header">
              <h2>SERVICE CONTRACTS FOR YOUR MERCEDES-BENZ</h2>
              <p>Peace of Mind, Guaranteed</p>
            </div>
            <div className="comparison-table">
              <div className="table-header">
                <div className="feature-column-header">What&apos;s Included</div>
                <div className="package-column">
                  <div className="package-name">Standard</div>
                  <div className="package-description">Essential maintenance</div>
                  <div className="package-price">
                    <span className="price-starting">Starting from</span>
                    <span className="price-amount">AED 2,700</span>
                    <span className="price-period">2 Years / 30,000 km</span>
                  </div>
                </div>
                <div className="package-column premium">
                  <div className="package-name">Premium</div>
                  <div className="package-description">Comprehensive coverage package</div>
                  <div className="package-price">
                    <span className="price-starting">Starting from</span>
                    <span className="price-amount">AED 5,800</span>
                    <span className="price-period">4 Years / 60,000 km</span>
                  </div>
                </div>
              </div>
              
              <div className="table-body">
                <div className="feature-row">
                  <div className="feature-name">Service A (Minor)</div>
                  <div className="feature-value">1x</div>
                  <div className="feature-value">2x</div>
                </div>
                <div className="feature-row">
                  <div className="feature-name">Service B (Major)</div>
                  <div className="feature-value">1x</div>
                  <div className="feature-value">2x</div>
                </div>
                <div className="feature-row">
                  <div className="feature-name">Brake Fluid Replacement</div>
                  <div className="feature-value">1x</div>
                  <div className="feature-value">2x</div>
                </div>
                <div className="feature-row">
                  <div className="feature-name">Spark Plug Replacement</div>
                  <div className="feature-value not-included">—</div>
                  <div className="feature-value">✓</div>
                </div>
                <div className="feature-row">
                  <div className="feature-name">Coolant Replacement</div>
                  <div className="feature-value not-included">—</div>
                  <div className="feature-value">✓</div>
                </div>
                <div className="feature-row">
                  <div className="feature-name">Transmission Oil Change + Filter Replacement</div>
                  <div className="feature-value not-included">—</div>
                  <div className="feature-value">✓</div>
                </div>
                <div className="feature-row">
                  <div className="feature-name">Full Vehicle Inspection</div>
                  <div className="feature-value">✓</div>
                  <div className="feature-value">✓</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <div className="contact-content">
            <div className="contact-header">
              <h2>CONTACT US</h2>
              <p>Get in touch with Dubai&apos;s trusted Mercedes-Benz specialists</p>
            </div>
            
            <div className="contact-grid">
              <div className="contact-methods">
                <div className="contact-cards-grid">
                  <div className="contact-card phone-card">
                    <div className="card-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <h3>Call Us Today</h3>
                    <p>For immediate assistance</p>
                    <div className="card-action">
                      <a href="tel:+97143805515" className="action-link">
                        <i className="fas fa-phone-alt fa-flip-horizontal"></i>
                        +971 4 380 5515
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-card whatsapp-card">
                    <div className="card-icon">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <h3>WhatsApp</h3>
                    <p>Quick service enquiries</p>
                    <div className="card-action">
                      <a href="https://wa.me/97143805515" target="_blank" className="action-link">
                        <i className="fab fa-whatsapp"></i>
                        Start Chat
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="hours-card">
                  <div className="hours-header">
                    <i className="fas fa-clock"></i>
                    <h3>Working Hours</h3>
                  </div>
                  <div className="hours-grid">
                    <div className="hours-item">
                      <span className="day">Monday - Saturday</span>
                      <span className="time">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="hours-item weekend">
                      <span className="day">Sunday</span>
                      <span className="time">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-map">
                <div className="map-container">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.695183028338!2d55.2304157!3d25.1459942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697d841a7417%3A0xa125c523dd3c7699!2sSilberArrows%20-%20Mercedes-Benz%20Sales%2C%20Service%20%26%20Lease!5e0!3m2!1sen!2sae!4v1752738482020!5m2!1sen!2sae"
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Silver Arrows Mercedes-Benz Service Location">
                  </iframe>
                  <div className="map-info-overlay">
                    <div className="overlay-content">
                      <div className="location-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <h4>Visit Our Workshop</h4>
                      <p>Al Manara Street, Al Quoz<br />Dubai, United Arab Emirates</p>
                      <div className="overlay-actions">
                        <a href="https://maps.app.goo.gl/wWEGEukBTrD6WC3KA?g_st=ipc" target="_blank" className="map-action primary">
                          <i className="fas fa-directions"></i>
                          Get Directions
                        </a>
                        <a href="tel:+97143805515" className="map-action">
                          <i className="fas fa-phone"></i>
                          Call
                        </a>
                        <a href="https://wa.me/97143805515" target="_blank" className="map-action">
                          <i className="fab fa-whatsapp"></i>
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
