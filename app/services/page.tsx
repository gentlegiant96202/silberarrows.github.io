'use client';
import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServicesSection from '../../components/ServicesSection';

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