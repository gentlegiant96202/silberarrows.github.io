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
    <div className="thank-you-page">
      <section className="thank-you-section">
        <div className="thank-you-content">
          <div className="thank-you-icon">
            <Icon name="check" size={48} variant="gold" />
          </div>
          
          <h1>Thank You!</h1>
          <p className="thank-you-message">
            We&apos;ve received your enquiry and will contact you shortly.
          </p>
          <p className="thank-you-submessage">
            Can&apos;t wait? Reach us directly:
          </p>
          
          <div className="thank-you-actions">
            <a href="tel:+97143805515" className="thank-you-btn primary">
              <Icon name="phone" size={20} variant="dark" />
              <span>Call +971 4 380 5515</span>
            </a>
            <a 
              href="https://wa.me/97143805515?text=Hi%20Team%20SilberArrows%2C%20I%20just%20submitted%20an%20enquiry%20and%20would%20like%20to%20chat." 
              target="_blank" 
              rel="noopener noreferrer"
              className="thank-you-btn secondary"
            >
              <Icon name="whatsapp" size={20} variant="white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
          
          <Link href="/" className="thank-you-home-link">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
