import React from 'react';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'SilberArrows | Premier Mercedes-Benz Service Center Dubai | Al Quoz',
  description: 'Dubai\'s trusted independent Mercedes-Benz specialists since 2011. Expert maintenance, repair & diagnostics at Al Quoz. Professional service for all Mercedes models with genuine parts.',
  keywords: 'SilberArrows, Mercedes-Benz service Dubai, independent Mercedes specialist, Mercedes repair Al Quoz, Mercedes maintenance Dubai, Mercedes diagnostics, genuine parts Dubai',
  openGraph: {
    title: 'SilberArrows | Premier Mercedes-Benz Service Center Dubai',
    description: 'Dubai\'s trusted independent Mercedes-Benz specialists since 2011. Expert service in Al Quoz with genuine parts.',
    url: 'https://silberarrows.ae',
    images: [
      {
        url: 'https://silberarrows.ae/assets/images/al-manara-location.webp',
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

        {/* Why Choose Us Section - React Component */}
        <WhyChooseUs />

        {/* Services Section - React Component */}
        <ServicesSection />

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
