'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

interface FeatureData {
  icon: string;
  title: string;
  mobileTitle?: string;
  description: string;
}

interface FeatureCardProps {
  feature: FeatureData;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <Icon name={feature.icon} size={32} variant="dark" />
      </div>
      <div className="feature-content">
        <h3>
          {feature.title}
          {feature.mobileTitle && <span className="mobile-hide"> {feature.mobileTitle}</span>}
        </h3>
        <p>{feature.description}</p>
      </div>
    </div>
  );
};

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features: FeatureData[] = [
    // Column 1
    {
      icon: 'cogs',
      title: 'GENUINE PARTS',
      mobileTitle: '& FACTORY STANDARDS',
      description: 'Only genuine Mercedes-Benz parts, fitted using manufacturer-approved tools and procedures.'
    },
    {
      icon: 'star',
      title: 'EXCLUSIVE TO MERCEDES-BENZ',
      description: 'We work on one marque only, Mercedes-Benz. That\'s where our expertise lies.'
    },
    // Column 2
    {
      icon: 'user-shield',
      title: 'FACTORY-TRAINED TECHNICIANS',
      description: 'Certified technicians trained to Mercedes-Benz standards with over seven decades of combined hands-on experience.'
    },
    {
      icon: 'file-contract',
      title: 'SERVICE CONTRACTS',
      description: 'Comprehensive maintenance packages designed to keep your Mercedes-Benz in peak condition with premium care.'
    },
    // Column 3
    {
      icon: 'shield-alt',
      title: '12-MONTH WARRANTY',
      description: 'All work is backed by a full 12-month warranty for your peace of mind.'
    },
    {
      icon: 'truck',
      title: 'FREE COLLECTION & DELIVERY',
      description: 'Complimentary vehicle collection and delivery across Dubai.'
    }
  ];

  // Group features into columns (2 features per column)
  const featureColumns = [
    features.slice(0, 2),  // Column 1: features 0-1
    features.slice(2, 4),  // Column 2: features 2-3
    features.slice(4, 6)   // Column 3: features 4-5
  ];

  return (
    <section 
      ref={sectionRef}
      className={`why-choose-us-section${isVisible ? ' is-visible' : ''}`}
    >
      {/* Mobile-only showroom image at top */}
      <div className="why-choose-us-mobile-image">
        <img 
          src="/assets/images/why-choose-us-bg-mobile.avif" 
          alt="Silver Arrows Mercedes-Benz Service Centre"
          width={600}
          height={425}
          fetchPriority="high"
        />
        <div className="mobile-image-overlay"></div>
      </div>
      
      <div className="why-choose-us-content">
        <div className="section-header">
          <h2>WHY CHOOSE US?</h2>
          <p>With over a decade of dedicated experience, we provide unparalleled expertise and premium service exclusively for Mercedes-Benz owners in Dubai.</p>
        </div>
        <div className="features-columns">
          {featureColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="feature-column">
              {column.map((feature, featureIndex) => (
                <FeatureCard key={featureIndex} feature={feature} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 