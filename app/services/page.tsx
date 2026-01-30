import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServicesSection from '../../components/ServicesSection';

export const metadata: Metadata = {
  title: 'Mercedes-Benz Services Dubai | SilberArrows Al Quoz | Expert Maintenance',
  description: 'Complete Mercedes-Benz services in Dubai: maintenance, diagnostics, brakes, A/C, engine & suspension. Expert specialists at Al Quoz.',
  keywords: 'Mercedes-Benz services Dubai, Mercedes maintenance Dubai, Mercedes diagnostics, Mercedes brake service Dubai, Mercedes A/C repair, engine service Al Quoz, suspension repair',
  openGraph: {
    title: 'Mercedes-Benz Services Dubai | SilberArrows Al Quoz',
    description: 'Complete Mercedes-Benz services in Dubai - maintenance, diagnostics, repairs by expert specialists.',
    url: 'https://mercedes-benz.silberarrows.com/services',
  },
};

// All services for SEO-friendly server-rendered links
const allServices = [
  { href: '/services/scheduled-maintenance/', title: 'Scheduled Maintenance' },
  { href: '/services/brake-service/', title: 'Brake Service & Repair' },
  { href: '/services/tyre-replacement/', title: 'Tyre Replacement & Balancing' },
  { href: '/services/wheel-alignment/', title: 'Wheel Alignment' },
  { href: '/services/battery-service/', title: 'Battery Testing & Replacement' },
  { href: '/services/air-conditioning/', title: 'Air Conditioning Service & Repair' },
  { href: '/services/engine-repair/', title: 'Engine Repair & Overhaul' },
  { href: '/services/suspension-repair/', title: 'Suspension & Steering Repair' },
  { href: '/services/diagnostics/', title: 'Electrical & Computer Diagnostics' },
  { href: '/services/detailing/', title: 'Interior & Exterior Detailing' },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesSection />
        {/* Server-rendered service links for SEO crawlers */}
        <nav aria-label="All Mercedes-Benz Services" className="services-seo-nav">
          <h2>Our Mercedes-Benz Services</h2>
          <ul>
            {allServices.map((service) => (
              <li key={service.href}>
                <Link href={service.href}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
      <Footer />
    </>
  );
} 