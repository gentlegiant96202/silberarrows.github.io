'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // lock scroll when menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
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
              <FontAwesomeIcon icon={faMapMarkerAlt as IconProp} />
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
            <div className="contact-buttons">
              <a href="tel:+97143805515" className="contact-btn phone-btn">
                <FontAwesomeIcon icon={faPhone as IconProp} />
                <span>+971 4 380 5515</span>
              </a>
              <a href="https://wa.me/97143805515" className="contact-btn whatsapp">
                <FontAwesomeIcon icon={faWhatsapp as IconProp} />
              </a>
            </div>
          </div>
          <button className="mobile-nav-toggle" aria-label="Toggle mobile menu" onClick={() => setMobileOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-nav-container${mobileOpen ? ' active' : ''}`} style={{ backdropFilter: 'blur(40px)', background: 'rgba(18,18,18,0.9)' }} onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
        <div className="mobile-nav-header">
          <div className="logo-container">
            <Link href="/">
              <img src="/assets/icons/logo.svg" alt="Silber Arrows Logo" className="logo" />
            </Link>
          </div>
          <button className="mobile-nav-close" aria-label="Close mobile menu" onClick={() => setMobileOpen(false)}>
            <FontAwesomeIcon icon={faTimes as IconProp} style={{ fontSize: '28px', color: '#fff', transform: 'scaleY(0.85)' }} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services/" className="nav-link">Services</Link>
          <Link href="/service-contracts/" className="nav-link">Service Contracts</Link>
          <Link href="/contact/" className="nav-link">Contact</Link>
          <div className="mobile-contact-info">
            <a href="tel:+97143805515" className="contact-btn phone-btn">
              <FontAwesomeIcon icon={faPhone as IconProp} />
              <span>+971 4 380 5515</span>
            </a>
            <div className="address">
              <FontAwesomeIcon icon={faMapMarkerAlt as IconProp} />
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
