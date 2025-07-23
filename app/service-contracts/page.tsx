import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceContracts from '../../components/ServiceContracts';
import ContactSection from '../../components/ContactSection';

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