import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceContracts from '../../components/ServiceContracts';
import ContactSection from '../../components/ContactSection';

export const metadata: Metadata = {
  title: 'Mercedes-Benz Service Contracts Dubai | SilberArrows Maintenance Plans',
  description: 'Affordable Mercedes-Benz service contracts in Dubai. Comprehensive maintenance plans for A, B, C, E, S-Class & more. Save money with SilberArrows service packages in Al Quoz.',
  keywords: 'Mercedes service contracts Dubai, Mercedes maintenance plans, Mercedes service packages Dubai, A-Class service plan, C-Class maintenance contract, E-Class service Dubai',
  openGraph: {
    title: 'Mercedes-Benz Service Contracts Dubai | SilberArrows Maintenance Plans',
    description: 'Affordable Mercedes-Benz service contracts and maintenance plans in Dubai. Save money with professional service packages.',
    url: 'https://mercedes-benz.silberarrows.com/service-contracts',
  },
};

export default function ServiceContractsPage() {
  return (
    <>
      <Header />
      <main>
                    {/* Service Contracts Section - React Component */}
            <ServiceContracts />

            {/* Contact Section - React Component */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
} 