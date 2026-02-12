import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '../../../components/Icon';

export const metadata: Metadata = {
  title: 'Thank You | SilberArrows Mercedes-Benz Service Dubai',
  description: 'Thank you for contacting SilberArrows. We will get back to you shortly.',
  robots: 'noindex, nofollow',
};

export default function ThankYouServicePage() {
  return (
    <div className="ty-page">
      <div className="ty-bg-pattern" />
      
      <div className="ty-card">
        {/* Logo */}
        <img 
          src="/assets/icons/logo.svg" 
          alt="SilberArrows" 
          className="ty-logo"
        />

        {/* Success Icon */}
        <div className="ty-icon-ring">
          <div className="ty-icon-inner">
            <Icon name="check" size={36} variant="dark" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="ty-title">We&apos;ve Got Your Details</h1>
        
        <div className="ty-divider" />

        <p className="ty-message">
          A Mercedes-Benz specialist will contact you shortly via WhatsApp.
        </p>

        <p className="ty-response-time">
          Average response time: <strong>under 5 minutes</strong>
        </p>

        {/* Actions */}
        <div className="ty-actions">
          <a href="tel:+97143805515" className="ty-btn ty-btn-call">
            <Icon name="phone" size={18} variant="white" />
            <span>Call +971 4 380 5515</span>
          </a>
          <a 
            href="https://wa.me/97143805515?text=Hi%20Team%20SilberArrows%2C%20I%20just%20submitted%20an%20enquiry%20and%20would%20like%20to%20chat." 
            target="_blank" 
            rel="noopener noreferrer"
            className="ty-btn ty-btn-whatsapp"
          >
            <Icon name="whatsapp" size={18} variant="white" />
            <span>WhatsApp Us Now</span>
          </a>
        </div>

        {/* Back link */}
        <Link href="/" className="ty-back">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
