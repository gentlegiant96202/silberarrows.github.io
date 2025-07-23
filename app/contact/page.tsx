import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock, faMapMarkerAlt, faDirections } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Contact Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">CONTACT US</h1>
            <p className="contact-hero-subtitle">Get in touch with Dubai&apos;s trusted Mercedes-Benz specialists</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <div className="contact-content">
            <div className="contact-grid">
              {/* Contact Methods */}
              <div className="contact-methods">
                <div className="contact-cards-grid">
                  <div className="contact-card phone-card">
                    <div className="card-icon"><FontAwesomeIcon icon={faPhone as IconProp} /></div>
                    <h3>Call Us Today</h3>
                    <p>For immediate assistance</p>
                    <div className="card-action">
                      <a href="tel:+97143805515" className="action-link">
                        <FontAwesomeIcon icon={faPhone as IconProp} />
                        +971 4 380 5515
                      </a>
                    </div>
                  </div>

                  <div className="contact-card whatsapp-card">
                    <div className="card-icon"><FontAwesomeIcon icon={faWhatsapp as IconProp} /></div>
                    <h3>WhatsApp</h3>
                    <p>Quick service enquiries</p>
                    <div className="card-action">
                      <a href="https://wa.me/97143805515" target="_blank" className="action-link">
                        <FontAwesomeIcon icon={faWhatsapp as IconProp} />
                        Start Chat
                      </a>
                    </div>
                  </div>
                </div>

                <div className="hours-card">
                  <div className="hours-header"><FontAwesomeIcon icon={faClock as IconProp} /><h3>Working Hours</h3></div>
                  <div className="hours-grid">
                    <div className="hours-item"><span className="day">Monday - Saturday</span><span className="time">8:00 AM - 6:00 PM</span></div>
                    <div className="hours-item weekend"><span className="day">Sunday</span><span className="time">Closed</span></div>
                  </div>
                </div>
              </div>

              {/* Map Column */}
              <div className="contact-map">
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.695183028338!2d55.2304157!3d25.1459942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f697d841a7417%3A0xa125c523dd3c7699!2sSilberArrows%20-%20Mercedes-Benz%20Sales%2C%20Service%20%26%20Lease!5e0!3m2!1sen!2sae!4v1752738482020!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Silver Arrows Mercedes-Benz Service Location"
                  ></iframe>
                  <div className="map-info-overlay">
                    <div className="overlay-content">
                      <div className="location-icon"><FontAwesomeIcon icon={faMapMarkerAlt as IconProp} /></div>
                      <h4>Visit Our Workshop</h4>
                      <p>Al Manara Street, Al Quoz<br />Dubai, United Arab Emirates</p>
                      <div className="overlay-actions">
                        <a href="https://maps.app.goo.gl/wWEGEukBTrD6WC3KA?g_st=ipc" target="_blank" className="map-action primary"><FontAwesomeIcon icon={faDirections as IconProp} />Get Directions</a>
                        <a href="tel:+97143805515" className="map-action"><FontAwesomeIcon icon={faPhone as IconProp} />Call</a>
                        <a href="https://wa.me/97143805515" target="_blank" className="map-action"><FontAwesomeIcon icon={faWhatsapp as IconProp} />WhatsApp</a>
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