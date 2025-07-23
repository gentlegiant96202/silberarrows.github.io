'use client';
import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import ServicesSection from '../components/ServicesSection';
import { HeroSection } from '../components/HeroSection';

export default function HomePage() {
  // Services navigation is now handled by main-optimized.js
  return (
    <>
      <Header />
      <main>
        {/* Hero Section - React Component */}
        <HeroSection />

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
                  <div className="feature-icon"><Icon name="cogs" size={32} variant="dark" /></div>
                  <div className="feature-content">
                    <h3>GENUINE PARTS<span className="mobile-hide"> & FACTORY STANDARDS</span></h3>
                    <p>Only genuine Mercedes-Benz parts, fitted using manufacturer-approved tools and procedures.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><Icon name="star" size={32} variant="dark" /></div>
                  <div className="feature-content">
                    <h3>EXCLUSIVE TO MERCEDES-BENZ</h3>
                    <p>We work on one marque only, Mercedes-Benz. That&apos;s where our expertise lies.</p>
                  </div>
                </div>
              </div>
              <div className="feature-column">
                <div className="feature-card">
                  <div className="feature-icon"><Icon name="user-shield" size={32} variant="dark" /></div>
                  <div className="feature-content">
                    <h3>FACTORY-TRAINED TECHNICIANS</h3>
                    <p>Certified technicians trained to Mercedes-Benz standards with over seven decades of combined hands-on experience.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><Icon name="file-contract" size={32} variant="dark" /></div>
                  <div className="feature-content">
                    <h3>SERVICE CONTRACTS</h3>
                    <p>Comprehensive maintenance packages designed to keep your Mercedes-Benz in peak condition with premium care.</p>
                  </div>
                </div>
              </div>
              <div className="feature-column">
                <div className="feature-card">
                  <div className="feature-icon"><Icon name="shield-alt" size={32} variant="dark" /></div>
                  <div className="feature-content">
                    <h3>12-MONTH WARRANTY</h3>
                    <p>All work is backed by a full 12-month warranty for your peace of mind.</p>
                  </div>
                </div>
                <div className="feature-card">
                  <div className="feature-icon"><Icon name="truck" size={32} variant="dark" /></div>
                  <div className="feature-content">
                    <h3>FREE COLLECTION & DELIVERY</h3>
                    <p>Complimentary vehicle collection and delivery across Dubai.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - React Component */}
        <ServicesSection />

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
                      <Icon name="phone-alt" size={24} variant="gold" flip />
                    </div>
                    <h3>Call Us Today</h3>
                    <p>For immediate assistance</p>
                    <div className="card-action">
                      <a href="tel:+97143805515" className="action-link">
                        <Icon name="phone-alt" size={16} variant="gold" flip />
                        +971 4 380 5515
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-card whatsapp-card">
                    <div className="card-icon">
                      <Icon name="whatsapp" size={24} variant="gold" />
                    </div>
                    <h3>WhatsApp</h3>
                    <p>Quick service enquiries</p>
                                          <div className="card-action">
                        <a href="https://wa.me/97143805515" target="_blank" className="action-link">
                          <Icon name="whatsapp" size={16} variant="gold" />
                          Start Chat
                        </a>
                    </div>
                  </div>
                </div>
                
                <div className="hours-card">
                  <div className="hours-header">
                    <Icon name="clock" size={20} variant="gold" />
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
                        <Icon name="location-dot" size={24} variant="gold" />
                      </div>
                      <h4>Visit Our Workshop</h4>
                      <p>Al Manara Street, Al Quoz<br />Dubai, United Arab Emirates</p>
                      <div className="overlay-actions">
                        <a href="https://maps.app.goo.gl/wWEGEukBTrD6WC3KA?g_st=ipc" target="_blank" className="map-action primary">
                          <Icon name="directions" size={16} variant="dark" />
                          Get Directions
                        </a>
                        <a href="tel:+97143805515" className="map-action">
                          <Icon name="phone" size={16} variant="gold" />
                          Call
                        </a>
                        <a href="https://wa.me/97143805515" target="_blank" className="map-action">
                          <Icon name="whatsapp" size={16} variant="gold" />
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
