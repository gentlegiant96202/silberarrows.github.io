'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Toggle body scroll
    document.body.classList.toggle('no-scroll', !isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dw0ciqgwd/image/upload/v1748497977/qgdbuhm5lpnxuggmltts.png"
              alt="Silber Arrows Logo"
              width={120}
              height={60}
              className="logo"
            />
          </Link>
        </div>
        
        <div className="header-right">
          <nav className="desktop-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
          </nav>
          <div className="header-contact">
            <div className="address-container">
              <i className="fas fa-map-marker-alt"></i>
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
            <div className="contact-buttons">
              <a href="tel:+97143805515" className="contact-btn phone-btn">
                <i className="fas fa-phone-alt"></i>
                <span>+971 4 380 5515</span>
              </a>
              <a href="https://wa.me/+97143805515" className="contact-btn whatsapp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <button 
            className={`mobile-nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            aria-label="Toggle mobile menu"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`mobile-nav-container ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <div className="logo-container">
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src="https://res.cloudinary.com/dw0ciqgwd/image/upload/v1748497977/qgdbuhm5lpnxuggmltts.png"
                alt="Silber Arrows Logo"
                width={120}
                height={60}
                className="logo"
              />
            </Link>
          </div>
          <button 
            className="mobile-nav-close" 
            aria-label="Close mobile menu"
            onClick={closeMobileMenu}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav className="mobile-nav-links">
          <Link href="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
          <Link href="/services" className="nav-link" onClick={closeMobileMenu}>Services</Link>
          <Link href="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</Link>
          <div className="mobile-contact-info">
            <a href="tel:+97143805515" className="contact-btn phone-btn">
              <i className="fas fa-phone-alt"></i>
              <span>+971 4 380 5515</span>
            </a>
            <div className="address">
              <i className="fas fa-map-marker-alt"></i>
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
} 