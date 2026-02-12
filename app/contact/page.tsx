import React from 'react';
import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LocalBusinessSchema from '../../components/LocalBusinessSchema';
import ContactSection from '../../components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact SilberArrows | Mercedes-Benz Service Dubai | Al Manara Street',
  description: 'Visit SilberArrows Mercedes-Benz service in Al Quoz, Dubai. Call +971 4 380 5515 or WhatsApp for expert service.',
  keywords: 'SilberArrows contact, Mercedes service Dubai contact, Al Manara Street garage, Mercedes repair Al Quoz, Dubai Mercedes specialist contact',
  openGraph: {
    title: 'Contact SilberArrows | Mercedes-Benz Service Dubai',
    description: 'Visit our Mercedes-Benz service center in Al Quoz, Dubai. Expert repair & maintenance services.',
    url: 'https://mercedes-benz.silberarrows.com/contact',
    images: [{
      url: 'https://mercedes-benz.silberarrows.com/assets/images/al-manara-location.webp',
      width: 800,
      height: 600,
      alt: 'SilberArrows Mercedes-Benz Service Center Dubai',
    }],
  },
};

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema />
      <Header />
      <main>
        {/* Contact Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">CONTACT US</h1>
            <p className="contact-hero-subtitle">Get in touch with Dubai&apos;s trusted Mercedes-Benz specialists</p>
          </div>
        </section>

        {/* Contact Section with integrated form modal */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
} 