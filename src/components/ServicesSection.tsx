'use client';

import { useState } from 'react';

const services = [
  {
    id: 'scheduled-maintenance',
    title: 'Minor (A) & Major (B) Service',
    icon: 'fas fa-clipboard-list',
    description: 'Regular servicing is essential to retain your vehicle\'s efficiency, safety, and long-term value.',
  },
  {
    id: 'brake-service',
    title: 'Brakes',
    icon: 'fas fa-dot-circle',
    description: 'Comprehensive brake inspections, servicing, and repairs using only genuine Mercedes-Benz parts.',
  },
  {
    id: 'tyre-replacement',
    title: 'tyres',
    icon: 'fas fa-sync-alt',
    description: 'We supply and fit Mercedes-Benz-approved tyres, including run-flats and AMG-specific sizes.',
  },
  {
    id: 'wheel-alignment',
    title: 'Wheel alignemnt',
    icon: 'fas fa-drafting-compass',
    description: 'Precise wheel alignment for steering accuracy, even tyre wear, and overall vehicle stability.',
  },
  {
    id: 'battery-replacement',
    title: 'Batteries',
    icon: 'fas fa-bolt',
    description: 'Our battery services ensure reliable starts and prevent electrical issues.',
  },
  {
    id: 'ac-service',
    title: 'AC repair',
    icon: 'fas fa-snowflake',
    description: 'A properly functioning A/C system ensures cabin comfort and air quality.',
  },
  {
    id: 'engine-repair',
    title: 'Engine Repair',
    icon: 'fas fa-cogs',
    description: 'From minor engine issues to complete overhauls using factory repair methods.',
  },
  {
    id: 'suspension-repair',
    title: 'Suspension Repair',
    icon: 'fas fa-network-wired',
    description: 'We specialise in both conventional and advanced systems including AIRMATIC and ABC.',
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics',
    icon: 'fas fa-microchip',
    description: 'We identify and resolve issues with ECUs, control modules, sensors, and wiring faults.',
  },
  {
    id: 'detailing',
    title: 'Detailing',
    icon: 'fas fa-gem',
    description: 'Restore your Mercedes-Benz to showroom condition with our professional detailing services.',
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(services[0].id);

  const handleServiceClick = (serviceId: string) => {
    setActiveService(serviceId);
  };

  const currentService = services.find(service => service.id === activeService) || services[0];

  return (
    <section className="services-section">
      <div className="section-header">
        <h2>OUR SERVICES</h2>
        <p>Specialized Mercedes-Benz solutions delivered with precision and expertise</p>
      </div>

      <div className="services-layout">
        <nav className="services-nav">
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <button
                  className={`services-nav-item ${activeService === service.id ? 'active' : ''}`}
                  onClick={() => handleServiceClick(service.id)}
                >
                  {service.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="service-card-display">
          <div className="service-pane active">
            <div className="service-card">
              <i className={currentService.icon}></i>
              <h3>{currentService.title}</h3>
              <p>{currentService.description}</p>
              <a href="/services" className="read-more-btn">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 