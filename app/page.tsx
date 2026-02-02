import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServicesSection';
import { HeroSection } from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TeamSection from '../components/TeamSection';
import ServiceContracts from '../components/ServiceContracts';
import ContactSection from '../components/ContactSection';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import OrganizationSchema from '../components/OrganizationSchema';

// All services for SEO-friendly server-rendered links
const allServices = [
  { href: '/services/brake-service/', title: 'Brake Service & Repair' },
  { href: '/services/scheduled-maintenance/', title: 'Scheduled Maintenance' },
  { href: '/services/tyre-replacement/', title: 'Tyre Replacement & Balancing' },
  { href: '/services/wheel-alignment/', title: 'Wheel Alignment' },
  { href: '/services/battery-service/', title: 'Battery Testing & Replacement' },
  { href: '/services/air-conditioning/', title: 'Air Conditioning Service & Repair' },
  { href: '/services/engine-repair/', title: 'Engine Repair & Overhaul' },
  { href: '/services/suspension-repair/', title: 'Suspension & Steering Repair' },
  { href: '/services/diagnostics/', title: 'Electrical & Computer Diagnostics' },
  { href: '/services/detailing/', title: 'Interior & Exterior Detailing' },
];

export const metadata: Metadata = {
  title: 'SilberArrows | Mercedes-Benz Service Center Dubai',
  description: 'Dubai\'s trusted Mercedes-Benz specialists since 2011. Expert maintenance, repair & diagnostics at Al Quoz with genuine parts.',
  keywords: 'SilberArrows, Mercedes-Benz service Dubai, independent Mercedes specialist, Mercedes repair Al Quoz, Mercedes maintenance Dubai, Mercedes diagnostics, genuine parts Dubai',
  openGraph: {
    title: 'SilberArrows | Premier Mercedes-Benz Service Center Dubai',
    description: 'Dubai\'s trusted independent Mercedes-Benz specialists since 2011. Expert service in Al Quoz with genuine parts.',
    url: 'https://mercedes-benz.silberarrows.com',
    images: [
      {
        url: 'https://mercedes-benz.silberarrows.com/assets/images/al-manara-location.webp',
        width: 800,
        height: 600,
        alt: 'SilberArrows Mercedes-Benz Service Center',
      },
    ],
  },
};

export default function HomePage() {
  // Services navigation is now handled by main-optimized.js
  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <Header />
      <main>
        {/* Hero Section - React Component */}
        <HeroSection />

        {/* Mobile-only: Server-rendered LCP image for Why Choose Us (faster discovery) */}
        <div className="why-choose-us-mobile-image-ssr">
          <img 
            src="/assets/images/why-choose-us-bg-mobile.avif" 
            alt="Silver Arrows Mercedes-Benz Service Centre"
            width={600}
            height={425}
            fetchPriority="high"
          />
        </div>

        {/* Why Choose Us Section - React Component */}
        <WhyChooseUs />

        {/* Services Section - React Component */}
        <ServicesSection />
        
        {/* Server-rendered service links for SEO crawlers (visually hidden) */}
        <nav aria-label="All Mercedes-Benz Services" className="sr-only">
          {allServices.map((service) => (
            <Link key={service.href} href={service.href}>{service.title}</Link>
          ))}
        </nav>

        {/* Team Section - React Component */}
        <TeamSection />

        {/* Service Contracts Section - React Component */}
        <ServiceContracts />

        {/* Contact Section - React Component */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
