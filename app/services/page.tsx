import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServicesSection from '../../components/ServicesSection';

export const metadata: Metadata = {
  title: 'Mercedes-Benz Services Dubai | SilberArrows Al Quoz | Expert Maintenance',
  description: 'Complete Mercedes-Benz services in Dubai - maintenance, diagnostics, brake service, A/C repair, engine service, suspension & more. Professional Mercedes specialists at Al Quoz.',
  keywords: 'Mercedes-Benz services Dubai, Mercedes maintenance Dubai, Mercedes diagnostics, Mercedes brake service Dubai, Mercedes A/C repair, engine service Al Quoz, suspension repair',
  openGraph: {
    title: 'Mercedes-Benz Services Dubai | SilberArrows Al Quoz',
    description: 'Complete Mercedes-Benz services in Dubai - maintenance, diagnostics, repairs by expert specialists.',
    url: 'https://silberarrows.ae/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
} 