'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from './Icon';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // lock scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('no-scroll');
      document.body.classList.add('menu-open');
      document.body.classList.add('nav-open'); // For compatibility with existing CSS
    } else {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('menu-open');
      document.body.classList.remove('nav-open');
    }
  }, [mobileOpen]);

  return (
    <div id="header-placeholder">
      <header>
        <div className="logo-container">
          <Link href="/">
            <img src="/assets/icons/logo.svg" alt="Silber Arrows Logo" className="logo" width="160" height="54" />
          </Link>
        </div>
        <div className="header-right">
          <nav className="desktop-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services/" className="nav-link">Services</Link>
            <Link href="/service-pricing/" className="nav-link">Service Pricing</Link>
            <Link href="/service-contracts/" className="nav-link">Service Contracts</Link>
            <Link href="/contact/" className="nav-link">Contact</Link>
          </nav>
          <div className="header-contact">
            <div className="address-container">
              <Icon name="location-dot" size={16} />
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
            <div className="contact-buttons">
              <a href="tel:+97143805515" className="contact-btn phone-btn">
                <Icon name="phone" size={16} variant="dark" />
                <span>+971 4 380 5515</span>
              </a>
              {/* Hamburger replaces WhatsApp icon on mobile */}
              <button
                className={`mobile-nav-toggle${mobileOpen ? ' active' : ''}`}
                aria-label="Toggle mobile menu"
                onClick={() => setMobileOpen(prev => !prev)}
                style={{ zIndex: 1500 }}
              >
                <span style={{ backgroundColor: '#1a1a1a' }}></span>
                <span style={{ backgroundColor: '#1a1a1a' }}></span>
                <span style={{ backgroundColor: '#1a1a1a' }}></span>
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
              <img src="/assets/icons/logo.svg" alt="Silber Arrows Logo" className="logo" width="160" height="54" />
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
          <Link href="/service-pricing/" className="nav-link" onClick={() => setMobileOpen(false)}>Service Pricing</Link>
          <Link href="/service-contracts/" className="nav-link" onClick={() => setMobileOpen(false)}>Service Contracts</Link>
          <Link href="/contact/" className="nav-link" onClick={() => setMobileOpen(false)}>Contact</Link>
          <div className="mobile-contact-info">
            <a href="tel:+97143805515" className="contact-btn phone-btn">
              <Icon name="phone" size={16} />
              <span>+971 4 380 5515</span>
            </a>
            <div className="address">
              <Icon name="location-dot" size={16} />
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
