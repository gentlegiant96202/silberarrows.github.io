'use client';

import { useState } from 'react';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
  const [showContactActions, setShowContactActions] = useState(false);

  const handleQuoteClick = () => {
    setShowContactActions(!showContactActions);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tagline">Exclusive Automotive Excellence</div>
          <h1 className="hero-title">
            Independent <span>Mercedes-Benz</span><br />Service Centre<br />in Dubai
          </h1>
          <p className="hero-subtitle">
            Exclusively Servicing Mercedes-Benz Only.<br />
            Our trusted name ensures a service record from us retains your vehicle&apos;s value.
          </p>
          <div className="hero-cta-container">
            <button 
              className={`hero-cta ${showContactActions ? 'hide' : ''}`}
              onClick={handleQuoteClick}
            >
              <span>GET A FREE QUOTE</span>
            </button>
            <div className={`hero-contact-actions ${showContactActions ? 'active' : ''}`}>
              <a href="tel:+97143805515" className="hero-action">
                <i className="fas fa-phone-alt"></i>
                <span>+971 4 380 5515</span>
              </a>
              <a href="https://wa.me/+97143805515" className="hero-action">
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
          <div className="year-badge">
            <i className="fas fa-medal"></i>
            Setting the Standard since 2011
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <div className="why-choose-us-content">
          <div className="why-choose-us-text">
            <div className="section-header">
              <h2>WHY CHOOSE US?</h2>
              <p>With over a decade of dedicated experience, we provide unparalleled expertise and premium service exclusively for Mercedes-Benz owners in Dubai.</p>
            </div>
          </div>
          <div className="features-container">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck"></i>
              </div>
              <div className="feature-content">
                <h3>Free Pick-up & Delivery</h3>
                <p>Complimentary vehicle collection and delivery service across Dubai.</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="feature-content">
                <h3>12-Month Warranty</h3>
                <p>Full warranty coverage on both parts and labour for your peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Warranty Section */}
      <section className="warranty-section">
        <div className="warranty-container">
          <div className="section-header">
            <h2>Peace of Mind, Guaranteed</h2>
            <p>Explore our comprehensive warranty and service contract options.</p>
          </div>
          <div className="warranty-cards-simple">
            <a href="/extended-warranty" className="warranty-card-link">
              <div className="warranty-card-simple">
                <div className="card-icon"><i className="fas fa-shield-alt"></i></div>
                <h3>Extended Warranty</h3>
                <p>Continue your protection beyond the factory warranty.</p>
                <div className="price-range">
                  <span className="starting">Starts from</span>
                  <span className="amount">AED 2,400</span>
                  <span className="period">/ year</span>
                </div>
                <div className="card-arrow"><i className="fas fa-arrow-right"></i></div>
              </div>
            </a>
            <a href="/service-contracts" className="warranty-card-link">
              <div className="warranty-card-simple">
                <div className="card-icon"><i className="fas fa-file-contract"></i></div>
                <h3>Service Contracts</h3>
                <p>Lock in your maintenance costs and save on future services.</p>
                <div className="price-range">
                  <span className="starting">Starts from</span>
                  <span className="amount">AED 1,800</span>
                  <span className="period">/ year</span>
                </div>
                <div className="card-arrow"><i className="fas fa-arrow-right"></i></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Footer */}
      <div className="mobile-footer">
        <div className="footer-content">
          <div className="footer-actions">
            <a href="tel:+97143805515" className="footer-action">
              <i className="fas fa-phone"></i>
              <span>Call Us</span>
            </a>
            <a href="https://wa.me/+97143805515" className="footer-action">
              <i className="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
