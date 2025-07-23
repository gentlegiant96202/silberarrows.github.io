'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Inline SVG Icons
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor">
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3l49.4-40.4c13.7-11.1 18.4-30 11.6-46.3l-40-96z"/>
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 384 512" fill="currentColor">
    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
  </svg>
);

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // lock scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('no-scroll');
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('menu-open');
    }
  }, [mobileOpen]);

  return (
    <div id="header-placeholder" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: '80px',
      background: 'rgba(18, 18, 18, 0.8)', // darker overlay
      backdropFilter: 'blur(30px)', // stronger blur
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <header>
        <div className="logo-container">
          <Link href="/">
            <img src="/assets/icons/logo.svg" alt="Silber Arrows Logo" className="logo" />
          </Link>
        </div>
        <div className="header-right">
          <nav className="desktop-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services/" className="nav-link">Services</Link>
            <Link href="/service-contracts/" className="nav-link">Service Contracts</Link>
            <Link href="/contact/" className="nav-link">Contact</Link>
          </nav>
          <div className="header-contact">
            <div className="address-container">
              <LocationIcon className="fas fa-map-marker-alt" />
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
            <div className="contact-buttons">
              <a href="tel:+97143805515" className="contact-btn phone-btn">
                <PhoneIcon className="fas fa-phone-alt" />
                <span>+971 4 380 5515</span>
              </a>
              {/* Hamburger replaces WhatsApp icon on mobile */}
              <button
                className={`mobile-nav-toggle${mobileOpen ? ' active' : ''}`}
                aria-label="Toggle mobile menu"
                onClick={() => setMobileOpen(prev => !prev)}
                style={{ zIndex: 1500 }}
              >
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
          {/* Removed standalone hamburger button */}
        </div>
      </header>

      <div className={`mobile-nav-container${mobileOpen ? ' active' : ''}`} style={{ backdropFilter: 'blur(40px)', background: 'rgba(18,18,18,0.9)' }} onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
        <div className="mobile-nav-header">
          <div className="logo-container">
            <Link href="/">
              <img src="/assets/icons/logo.svg" alt="Silber Arrows Logo" className="logo" />
            </Link>
          </div>
          <button
            className="mobile-nav-close"
            aria-label="Close mobile menu"
            onClick={() => setMobileOpen(false)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav className="mobile-nav-links">
          <Link href="/" className="nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/services/" className="nav-link" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href="/service-contracts/" className="nav-link" onClick={() => setMobileOpen(false)}>Service Contracts</Link>
          <Link href="/contact/" className="nav-link" onClick={() => setMobileOpen(false)}>Contact</Link>
          <div className="mobile-contact-info">
            <a href="tel:+97143805515" className="contact-btn phone-btn">
              <PhoneIcon className="fas fa-phone-alt" />
              <span>+971 4 380 5515</span>
            </a>
            <div className="address">
              <LocationIcon className="fas fa-map-marker-alt" />
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
