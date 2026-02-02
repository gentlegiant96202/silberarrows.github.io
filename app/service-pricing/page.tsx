import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';

export const metadata: Metadata = {
  title: 'Mercedes-Benz Service Pricing Dubai | SilberArrows',
  description: 'Transparent Mercedes-Benz service pricing in Dubai. Minor and Major service packages for all models. AED 375/hour labour rate.',
  keywords: 'Mercedes service pricing Dubai, Mercedes service cost, Mercedes minor service price, Mercedes major service cost, Mercedes maintenance pricing Dubai',
  openGraph: {
    title: 'Mercedes-Benz Service Pricing Dubai | SilberArrows',
    description: 'Transparent Mercedes-Benz service pricing in Dubai. Competitive rates for all models.',
    url: 'https://mercedes-benz.silberarrows.com/service-pricing',
    images: [{
      url: 'https://mercedes-benz.silberarrows.com/assets/images/al-manara-location.webp',
      width: 800,
      height: 600,
      alt: 'SilberArrows Mercedes-Benz Service Center Dubai',
    }],
  },
};

const standardModels = [
  { model: 'A/C/CLA/CLE', minor: 'from AED 1,188', major: 'from AED 1,620' },
  { model: 'CLK', minor: 'from AED 1,080', major: 'from AED 1,620' },
  { model: 'E/CLS', minor: 'from AED 1,188', major: 'from AED 1,800' },
  { model: 'S/CL', minor: 'from AED 1,296', major: 'from AED 1,944' },
  { model: 'G', minor: 'from AED 1,680', major: 'from AED 2,640' },
  { model: 'GLA/GLB/GLK/GLC', minor: 'from AED 1,188', major: 'from AED 1,620' },
  { model: 'ML/GLE/GL/GLS', minor: 'from AED 1,296', major: 'from AED 1,944' },
  { model: 'V', minor: 'from AED 1,800', major: 'from AED 2,340' },
  { model: 'SLK/SLC', minor: 'from AED 972', major: 'from AED 1,920' },
  { model: 'SL', minor: 'from AED 1,296', major: 'from AED 2,400' },
  { model: 'SLS/AMG GT', minor: 'from AED 2,640', major: 'from AED 3,360' },
  { model: 'SLR', minor: 'n/a', major: 'from AED 7,080' },
  { model: 'Maybach', minor: 'from AED 3,120', major: 'from AED 3,600' },
];

const eqModels = [
  { model: 'EQ A/B/C', minor: 'from AED 1,188', major: 'from AED 1,620' },
  { model: 'EQ E/S/V/G', minor: 'from AED 1,440', major: 'from AED 1,800' },
];

export default function ServicePricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pricing-hero-section">
          <div className="pricing-hero-content">
            <h1>SERVICE PRICING</h1>
            <p className="pricing-intro">
              Part of our customer charter is to ensure that we are transparent – we charge you an hourly labour rate of <strong>AED 375</strong> (excluding Classic, Maybach and the McLaren SLR), which is significantly lower than some of the alternatives.
            </p>
          </div>
        </section>

        <section className="pricing-tables-section">
          <div className="pricing-container">
            <div className="pricing-header">
              <h2>BOOK YOUR SERVICE</h2>
              <p>Our service pricing is packaged to include parts and labour:</p>
            </div>

            {/* Standard Models Table */}
            <div className="pricing-table-wrapper">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Minor Service</th>
                    <th>Major Service</th>
                  </tr>
                </thead>
                <tbody>
                  {standardModels.map((item, index) => (
                    <tr key={index}>
                      <td className="model-name">{item.model}</td>
                      <td className="price">{item.minor}</td>
                      <td className="price">{item.major}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mercedes EQ Section */}
            <div className="eq-section">
              <h3>Mercedes EQ</h3>
              <div className="pricing-table-wrapper">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Minor Service</th>
                      <th>Major Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eqModels.map((item, index) => (
                      <tr key={index}>
                        <td className="model-name">{item.model}</td>
                        <td className="price">{item.minor}</td>
                        <td className="price">{item.major}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="pricing-notes">
              <p className="vat-note">Prices exclusive of VAT.</p>
              <p>
                Prices depend on engine size (and type); if your model does not feature in this list, please call{' '}
                <a href="tel:+97143805515" className="phone-link">+971 4 380 5515</a> for a price.
              </p>
              <p className="disclaimer">
                The operations performed during a Minor and Major Service adhere to the scheduled maintenance guidelines stipulated by Daimler GmbH.
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="pricing-bottom-cta">
              <h3>Ready to Book?</h3>
              <div className="pricing-cta-buttons">
                <a href="tel:+97143805515" className="pricing-cta-btn primary">
                  <Icon name="phone" size={18} variant="dark" />
                  <span>Call +971 4 380 5515</span>
                </a>
                <a href="https://wa.me/97143805515?text=Hi%20Team%20SilberArrows%2C%20I%20would%20like%20to%20get%20a%20service%20quote%20for%20my%20Mercedes-Benz." target="_blank" rel="noopener noreferrer" className="pricing-cta-btn secondary">
                  <Icon name="whatsapp" size={18} variant="white" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
