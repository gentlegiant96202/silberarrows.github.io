'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import ContactFormModal from './ContactFormModal';

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <div className="contact-header">
          <h2>CONTACT US</h2>
          <p>Get in touch with Dubai&apos;s trusted Mercedes-Benz specialists</p>
        </div>
        
        <div className="contact-grid">
          {/* Left Column - Contact CTA */}
          <div className="contact-cta-column">
            <div className="contact-cta-card" onClick={() => setIsModalOpen(true)}>
              <div className="cta-icon">
                <Icon name="phone-alt" size={32} variant="silver" flip />
              </div>
              <h3>Get in Touch</h3>
              <p>Speak directly with our Mercedes-Benz specialists for expert advice and service booking.</p>
              <button className="contact-cta-btn">
                <Icon name="whatsapp" size={20} variant="dark" />
                <span>Call or WhatsApp Us</span>
              </button>
            </div>
          </div>
          
          {/* Right Column - Map */}
          <div className="contact-map-column">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509954746!2d55.2267!3d25.1865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d553555555%3A0x5555555555555555!2sSilberArrows!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-overlay">
                <div className="map-overlay-content">
                  <h4>Visit Our Workshop</h4>
                  <p>Al Manara Street, Al Quoz<br />Dubai, UAE</p>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=SilberArrows,+Al+Manara+Street,+Al+Quoz,+Dubai"
                    className="directions-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="directions" size={16} variant="dark" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
