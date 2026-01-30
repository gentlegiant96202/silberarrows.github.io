import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceContracts from '../../components/ServiceContracts';
import ContactSection from '../../components/ContactSection';

export const metadata: Metadata = {
  title: 'Mercedes-Benz Service Contracts Dubai | SilberArrows Maintenance Plans',
  description: 'Affordable Mercedes-Benz service contracts in Dubai. Maintenance plans for all models. Save with SilberArrows packages.',
  keywords: 'Mercedes service contracts Dubai, Mercedes maintenance plans, Mercedes service packages Dubai, A-Class service plan, C-Class maintenance contract, E-Class service Dubai',
  openGraph: {
    title: 'Mercedes-Benz Service Contracts Dubai | SilberArrows Maintenance Plans',
    description: 'Affordable Mercedes-Benz service contracts and maintenance plans in Dubai. Save money with professional service packages.',
    url: 'https://mercedes-benz.silberarrows.com/service-contracts',
    images: [{
      url: 'https://mercedes-benz.silberarrows.com/assets/images/al-manara-location.webp',
      width: 800,
      height: 600,
      alt: 'SilberArrows Mercedes-Benz Service Center Dubai',
    }],
  },
};

export default function ServiceContractsPage() {
  return (
    <>
      <Header />
      <main>
        <h1 className="sr-only">Mercedes-Benz Service Contracts Dubai</h1>
        {/* Service Contracts Section - React Component */}
        <ServiceContracts />

            {/* Contact Section - React Component */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
} 