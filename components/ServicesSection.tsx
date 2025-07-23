'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface ServiceImages {
  avif?: {
    src320: string;
    src640: string;
  };
  webp?: {
    src320: string;
    src640: string;
  };
  fallback: string;
}

interface Service {
  id: string;
  title: string;
  mobileTitle: string;
  description: string;
  images: ServiceImages;
  href: string;
  alt: string;
}

const services: Service[] = [
  {
    id: 'scheduled-maintenance',
    title: 'Scheduled Maintenance',
    mobileTitle: 'Maintenance',
    description: 'Regular servicing is essential to retain your vehicle\'s efficiency, safety, and long-term value.',
    images: {
      avif: { src320: '/assets/images/maintenance-320.avif', src640: '/assets/images/maintenance-640.avif' },
      webp: { src320: '/assets/images/maintenance-320.webp', src640: '/assets/images/maintenance-640.webp' },
      fallback: '/assets/images/maintenance-640.webp'
    },
    href: '/services/scheduled-maintenance/',
    alt: 'Scheduled Maintenance'
  },
  {
    id: 'brake-service',
    title: 'Brake Service & Repair',
    mobileTitle: 'Brakes',
    description: 'Comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts.',
    images: {
      avif: { src320: '/assets/images/brake-service-320.avif', src640: '/assets/images/brake-service-640.avif' },
      webp: { src320: '/assets/images/brake-service-320.webp', src640: '/assets/images/brake-service-640.webp' },
      fallback: '/assets/images/brake-service-640.webp'
    },
    href: '/services/brake-service/',
    alt: 'Brake Service'
  },
  {
    id: 'tyre-replacement',
    title: 'Tyre Replacement & Balancing',
    mobileTitle: 'Tyres',
    description: 'We supply and fit Mercedes-Benz-approved tyres, including run-flats and AMG-specific sizes.',
    images: {
      avif: { src320: '/assets/images/tyres-320.avif', src640: '/assets/images/tyres-640.avif' },
      webp: { src320: '/assets/images/tyres-320.webp', src640: '/assets/images/tyres-640.webp' },
      fallback: '/assets/images/tyres-640.webp'
    },
    href: '/services/tyre-replacement/',
    alt: 'Tyre Replacement'
  },
  {
    id: 'wheel-alignment',
    title: 'Wheel Alignment',
    mobileTitle: 'Alignment',
    description: 'Precise wheel alignment for steering accuracy, even tyre wear, and overall vehicle stability.',
    images: {
      avif: { src320: '/assets/images/wheel-alignment-320.avif', src640: '/assets/images/wheel-alignment-640.avif' },
      webp: { src320: '/assets/images/wheel-alignment-320.webp', src640: '/assets/images/wheel-alignment-640.webp' },
      fallback: '/assets/images/wheel-alignment-640.webp'
    },
    href: '/services/wheel-alignment/',
    alt: 'Wheel Alignment'
  },
  {
    id: 'battery-replacement',
    title: 'Battery Testing & Replacement',
    mobileTitle: 'Battery',
    description: 'Our battery services ensure reliable starts and prevent electrical issues.',
    images: {
      avif: { src320: '/assets/images/battery-320.avif', src640: '/assets/images/battery-640.avif' },
      webp: { src320: '/assets/images/battery-320.webp', src640: '/assets/images/battery-640.webp' },
      fallback: '/assets/images/battery-640.webp'
    },
    href: '/services/battery-service/',
    alt: 'Battery Service'
  },
  {
    id: 'ac-service',
    title: 'Air Conditioning Service & Repair',
    mobileTitle: 'A/C',
    description: 'A properly functioning A/C system ensures cabin comfort and optimal air quality.',
    images: {
      avif: { src320: '/assets/images/Air-conditioning-320.avif', src640: '/assets/images/Air-conditioning-640.avif' },
      webp: { src320: '/assets/images/Air-conditioning-320.webp', src640: '/assets/images/Air-conditioning-640.webp' },
      fallback: '/assets/images/Air-conditioning-640.webp'
    },
    href: '/services/air-conditioning/',
    alt: 'Air Conditioning Service'
  },
  {
    id: 'engine-repair',
    title: 'Engine Repair & Overhaul',
    mobileTitle: 'Engine',
    description: 'From minor engine issues to complete overhauls using factory repair methods.',
    images: {
      avif: { src320: '/assets/images/ENGINE-320.avif', src640: '/assets/images/ENGINE-640.avif' },
      webp: { src320: '/assets/images/ENGINE-320.webp', src640: '/assets/images/ENGINE-640.webp' },
      fallback: '/assets/images/ENGINE.webp'
    },
    href: '/services/engine-repair/',
    alt: 'Engine Repair'
  },
  {
    id: 'suspension-repair',
    title: 'Suspension & Steering Repair',
    mobileTitle: 'Suspension',
    description: 'Complete suspension system diagnostics and repair for smooth, comfortable driving.',
    images: {
      avif: { src320: '/assets/images/suspension-320.avif', src640: '/assets/images/suspension-640.avif' },
      webp: { src320: '/assets/images/suspension-320.webp', src640: '/assets/images/suspension-640.webp' },
      fallback: '/assets/images/suspension-640.webp'
    },
    href: '/services/suspension-repair/',
    alt: 'Suspension Repair'
  },
  {
    id: 'diagnostics',
    title: 'Electrical & Computer Diagnostics',
    mobileTitle: 'Diagnostics',
    description: 'We identify and resolve issues with ECUs, control modules, sensors, and wiring faults.',
    images: {
      avif: { src320: '/assets/images/diagnostics-320.avif', src640: '/assets/images/diagnostics-640.avif' },
      webp: { src320: '/assets/images/diagnostics-320.webp', src640: '/assets/images/diagnostics-640.webp' },
      fallback: '/assets/images/diagnostics-640.webp'
    },
    href: '/services/diagnostics/',
    alt: 'Diagnostics'
  },
  {
    id: 'detailing',
    title: 'Interior & Exterior Detailing',
    mobileTitle: 'Detailing',
    description: 'Restore your Mercedes-Benz to showroom condition with our professional detailing services.',
    images: {
      avif: { src320: '/assets/images/detailing-320.avif', src640: '/assets/images/detailing-640.avif' },
      webp: { src320: '/assets/images/detailing-320.webp', src640: '/assets/images/detailing-640.webp' },
      fallback: '/assets/images/detailing-640.webp'
    },
    href: '/services/detailing/',
    alt: 'Detailing'
  }
];

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const hasResponsiveImages = service.images.avif && service.images.webp;
  
  return (
    <div className="service-card service-card--has-image">
      <div className="service-card-image">
        {hasResponsiveImages ? (
          <picture>
            <source 
              type="image/avif" 
              srcSet={`${service.images.avif?.src320} 320w, ${service.images.avif?.src640} 640w`} 
              sizes="(max-width:600px) 320px, 640px" 
            />
            <source 
              type="image/webp" 
              srcSet={`${service.images.webp?.src320} 320w, ${service.images.webp?.src640} 640w`} 
              sizes="(max-width:600px) 320px, 640px" 
            />
            <img 
              src={service.images.fallback} 
              alt={service.alt} 
              width="640" 
              height="427" 
              loading="lazy" 
            />
          </picture>
        ) : (
          <img 
            src={service.images.fallback} 
            alt={service.alt} 
            width="640" 
            height="427" 
            loading="lazy" 
          />
        )}
      </div>
      <div className="service-card-content">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <Link href={service.href} className="read-more-btn">Learn More</Link>
      </div>
    </div>
  );
};

interface ServiceNavigationProps {
  services: Service[];
  activeServiceId: string;
  onServiceChange: (serviceId: string) => void;
}

const ServiceNavigation: React.FC<ServiceNavigationProps> = ({ 
  services, 
  activeServiceId, 
  onServiceChange 
}) => {
  return (
    <nav className="services-nav">
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <button
              className={activeServiceId === service.id ? 'active' : ''}
              onClick={() => onServiceChange(service.id)}
              type="button"
            >
              <span className="desktop-title">{service.title}</span>
              <span className="mobile-title">{service.mobileTitle}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0].id);
  
  const activeService = services.find(service => service.id === activeServiceId) || services[0];

  return (
    <section className="services-section" id="services">
      <div className="section-header">
        <h2>OUR SERVICES</h2>
        <p>Specialised Mercedes-Benz solutions delivered with precision and expertise</p>
      </div>
      <div className="services-layout">
        <ServiceNavigation 
          services={services}
          activeServiceId={activeServiceId}
          onServiceChange={setActiveServiceId}
        />
        <div className="service-card-display">
          <ServiceCard service={activeService} />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 