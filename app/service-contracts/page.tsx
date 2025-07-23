import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ServiceContractsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Service Contracts Section (same as original inner page) */}
        <section className="service-contracts-section">
          <div className="contracts-container">
            <div className="section-header">
              <h2>SERVICE CONTRACTS FOR YOUR MERCEDES-BENZ</h2>
              <p>Peace of Mind, Guaranteed</p>
            </div>
            <div className="comparison-table">
              <div className="table-header">
                <div className="feature-column-header">What's Included</div>
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
                <div className="feature-row"><div className="feature-name">Service A (Minor)</div><div className="feature-value">1x</div><div className="feature-value">2x</div></div>
                <div className="feature-row"><div className="feature-name">Service B (Major)</div><div className="feature-value">1x</div><div className="feature-value">2x</div></div>
                <div className="feature-row"><div className="feature-name">Brake Fluid Replacement</div><div className="feature-value">1x</div><div className="feature-value">2x</div></div>
                <div className="feature-row"><div className="feature-name">Spark Plug Replacement</div><div className="feature-value not-included">—</div><div className="feature-value">✓</div></div>
                <div className="feature-row"><div className="feature-name">Coolant Replacement</div><div className="feature-value not-included">—</div><div className="feature-value">✓</div></div>
                <div className="feature-row"><div className="feature-name">Transmission Oil Change + Filter Replacement</div><div className="feature-value not-included">—</div><div className="feature-value">✓</div></div>
                <div className="feature-row"><div className="feature-name">Full Vehicle Inspection</div><div className="feature-value">✓</div><div className="feature-value">✓</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* Re-use global contact section for CTA */}
        <section className="contact-section" id="contact">
          <div className="contact-content">
            <div className="contact-header">
              <h2>GET YOUR SERVICE CONTRACT TODAY</h2>
              <p>Contact us to discuss the perfect maintenance package for your Mercedes-Benz</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 