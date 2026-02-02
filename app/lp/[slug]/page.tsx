import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ServicesSection from '../../../components/ServicesSection';
import { LandingHeroSection } from '../../../components/LandingHeroSection';
import WhyChooseUs from '../../../components/WhyChooseUs';
import TeamSection from '../../../components/TeamSection';
import ServiceContracts from '../../../components/ServiceContracts';
import ContactSection from '../../../components/ContactSection';
import LocalBusinessSchema from '../../../components/LocalBusinessSchema';
import OrganizationSchema from '../../../components/OrganizationSchema';
import { getLandingPage, getAllLandingPageSlugs } from '../../../lib/landing-pages';

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

// Generate static params for all landing pages
export async function generateStaticParams() {
  const slugs = getAllLandingPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each landing page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getLandingPage(slug);
  
  if (!config) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: `Mercedes service Dubai, Mercedes-Benz service, Mercedes repair Dubai, ${slug.replace(/-/g, ' ')}`,
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://mercedes-benz.silberarrows.com/lp/${slug}/`,
      images: [
        {
          url: 'https://mercedes-benz.silberarrows.com/assets/images/al-manara-location.webp',
          width: 800,
          height: 600,
          alt: 'SilberArrows Mercedes-Benz Service Center',
        },
      ],
    },
    robots: {
      index: false,  // Don't index landing pages to avoid duplicate content
      follow: true,
    },
  };
}

export default async function LandingPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const config = getLandingPage(slug);

  if (!config) {
    notFound();
  }

  return (
    <>
      <LocalBusinessSchema />
      <OrganizationSchema />
      <Header />
      <main>
        {/* Landing Page Hero - Custom content based on ad group */}
        <LandingHeroSection config={config} />

        {/* Mobile-only: Server-rendered LCP image for Why Choose Us */}
        <div className="why-choose-us-mobile-image-ssr">
          <img 
            src="/assets/images/why-choose-us-bg-mobile.avif" 
            alt="Silver Arrows Mercedes-Benz Service Centre"
            width={600}
            height={425}
            fetchPriority="high"
          />
        </div>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Services Section */}
        <ServicesSection />
        
        {/* Server-rendered service links for SEO crawlers (visually hidden) */}
        <nav aria-label="All Mercedes-Benz Services" className="sr-only">
          {allServices.map((service) => (
            <Link key={service.href} href={service.href}>{service.title}</Link>
          ))}
        </nav>

        {/* Team Section */}
        <TeamSection />

        {/* Service Contracts Section */}
        <ServiceContracts />

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
