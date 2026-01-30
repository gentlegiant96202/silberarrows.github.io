import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';
import LocalBusinessSchema from '../../components/LocalBusinessSchema';

export const metadata: Metadata = {
  title: 'Contact SilberArrows | Mercedes-Benz Service Dubai | Al Manara Street',
  description: 'Visit SilberArrows Mercedes-Benz service in Al Quoz, Dubai. Call +971 4 380 5515 or WhatsApp for expert service.',
  keywords: 'SilberArrows contact, Mercedes service Dubai contact, Al Manara Street garage, Mercedes repair Al Quoz, Dubai Mercedes specialist contact',
  openGraph: {
    title: 'Contact SilberArrows | Mercedes-Benz Service Dubai',
    description: 'Visit our Mercedes-Benz service center in Al Quoz, Dubai. Expert repair & maintenance services.',
    url: 'https://mercedes-benz.silberarrows.com/contact',
    images: [{
      url: 'https://mercedes-benz.silberarrows.com/assets/images/al-manara-location.webp',
      width: 800,
      height: 600,
      alt: 'SilberArrows Mercedes-Benz Service Center Dubai',
    }],
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />
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
                    <div className="card-icon"><Icon name="phone" size={24} variant="gold" /></div>
                    <h3>Call Us Today</h3>
                    <p>For immediate assistance</p>
                    <div className="card-action">
                      <a href="tel:+97143805515" className="action-link">
                        <Icon name="phone" size={16} variant="gold" />
                        +971 4 380 5515
                      </a>
                    </div>
                  </div>

                  <div className="contact-card whatsapp-card">
                    <div className="card-icon"><Icon name="whatsapp" size={24} variant="gold" /></div>
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
                  <div className="hours-header"><Icon name="clock" size={20} variant="gold" /><h3>Working Hours</h3></div>
                  <div className="hours-grid">
                    <div className="hours-item"><span className="day">Monday - Saturday</span><span className="time">8:00 AM - 6:00 PM</span></div>
                    <div className="hours-item weekend"><span className="day">Sunday</span><span className="time">Closed</span></div>
                  </div>
                </div>
              </div>

              {/* Map Column */}
              <div className="contact-map">
                <div className="map-container">
                  <img
                    src="/assets/images/al-manara-location.webp"
                    alt="SilberArrows Mercedes-Benz Service Location - Al Manara Street, Al Quoz, Dubai"
                    width="800"
                    height="600"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      border: 0 
                    }}
                    loading="lazy"
                  />
                  <div className="map-info-overlay">
                    <div className="overlay-content">
                      <div className="location-icon"><Icon name="location-dot" size={24} variant="gold" /></div>
                      <h4>Visit Our Workshop</h4>
                      <p>Al Manara Street, Al Quoz<br />Dubai, United Arab Emirates</p>
                      <div className="overlay-actions">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=SilberArrows,+Al+Manara+Street,+Al+Quoz,+Dubai" target="_blank" className="map-action primary"><Icon name="directions" size={16} variant="dark" />Get Directions</a>
                        <a href="tel:+97143805515" className="map-action"><Icon name="phone" size={16} variant="gold" />Call</a>
                        <a href="https://wa.me/97143805515" target="_blank" className="map-action"><Icon name="whatsapp" size={16} variant="gold" />WhatsApp</a>
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