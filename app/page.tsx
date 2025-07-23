'use client';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServicesSection';
import { HeroSection } from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';
import TeamSection from '../components/TeamSection';
import ServiceContracts from '../components/ServiceContracts';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  // Services navigation is now handled by main-optimized.js
  return (
    <>
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
