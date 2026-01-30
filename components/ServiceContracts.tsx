'use client';

import React from 'react';

interface ContractFeature {
  name: string;
  standard: string | number;
  premium: string | number;
}

interface ServicePackage {
  name: string;
  description: string;
  price: string;
  period: string;
  isPremium?: boolean;
}

export default function ServiceContracts() {
  const packages: ServicePackage[] = [
    {
      name: 'Standard',
      description: 'Essential maintenance',
      price: '2,700',
      period: '2 Years / 30,000 km',
      isPremium: false
    },
    {
      name: 'Premium',
      description: 'Comprehensive coverage package',
      price: '5,800',
      period: '4 Years / 60,000 km',
      isPremium: true
    }
  ];

  const features: ContractFeature[] = [
    {
      name: 'Service A (Minor)',
      standard: '1x',
      premium: '2x'
    },
    {
      name: 'Service B (Major)',
      standard: '1x',
      premium: '2x'
    },
    {
      name: 'Brake Fluid Replacement',
      standard: '1x',
      premium: '2x'
    },
    {
      name: 'Spark Plug Replacement',
      standard: '—',
      premium: '✓'
    },
    {
      name: 'Coolant Replacement',
      standard: '—',
      premium: '✓'
    },
    {
      name: 'Transmission Oil Change + Filter Replacement',
      standard: '—',
      premium: '✓'
    },
    {
      name: 'Full Vehicle Inspection',
      standard: '✓',
      premium: '✓'
    }
  ];

  return (
    <section className="service-contracts-section">
      <div className="contracts-container">
        <div className="section-header">
          <h2>SERVICE CONTRACTS FOR YOUR MERCEDES-BENZ</h2>
          <p>Peace of Mind, Guaranteed</p>
        </div>
        
        <div className="comparison-table">
          <div className="table-header">
            <div className="feature-column-header">What&apos;s Included</div>
            {packages.map((pkg, index) => (
              <div key={index} className={`package-column ${pkg.isPremium ? 'premium' : ''}`}>
                <div className="package-name">{pkg.name}</div>
                <div className="package-description">{pkg.description}</div>
                <div className="package-price">
                  <span className="price-starting">Starting from</span>
                  <div className="price-display">
                    <span className="price-currency">AED</span>
                    <span className="price-amount">{pkg.price}</span>
                  </div>
                  <span className="price-period">{pkg.period}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="table-body">
            {features.map((feature, index) => (
              <div key={index} className="feature-row">
                <div className="feature-name">{feature.name}</div>
                <div className={`feature-value ${feature.standard === '—' ? 'not-included' : ''}`}>
                  {feature.standard}
                </div>
                <div className={`feature-value ${feature.premium === '—' ? 'not-included' : ''}`}>
                  {feature.premium}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 