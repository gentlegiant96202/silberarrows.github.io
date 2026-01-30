'use client';

import { useState, useEffect } from 'react';
import Icon from './Icon';

export function HeroSection() {
  const [showContactActions, setShowContactActions] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.onload = () => {
      setHeroLoaded(true);
    };
    img.src = '/assets/images/hero-bg-silver-optimized.avif';
  }, []);

  const handleQuoteClick = () => {
    setShowContactActions(true);
  };

  const handleClickOutside = () => {
    setShowContactActions(false);
  };

  return (
    <section className={`hero${heroLoaded ? ' hero-loaded' : ''}`}>
      <div className="hero-content">
        <div className="hero-logo">
          <img src="/assets/icons/silberarrows-logo.png" alt="Silver Arrows Logo" className="hero-logo-img" width="300" height="90" />
        </div>
        <div className="hero-tagline">Exclusive Automotive Excellence</div>
        <h1 className="hero-title">Independent<br /><span>Mercedes-Benz</span><br />Service Centre<br />in Dubai</h1>
        <p className="hero-subtitle">Exclusively Servicing Mercedes-Benz Only.<br />Our trusted name ensures a service record from us<br />retains your vehicle&apos;s value.</p>
        
        <div className="hero-cta-container" onClick={handleClickOutside}>
          <button 
            className={`hero-cta quote-trigger ${showContactActions ? 'hide' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleQuoteClick();
            }}
          >
            <span>GET A FREE QUOTE</span>
            <span className="cta-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </button>
          
          <div 
            className={`hero-contact-actions ${showContactActions ? 'active' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <a href="tel:+97143805515" className="hero-action">
              <Icon name="phone" size={18} />
              <span>+971 4 380 5515</span>
            </a>
            <a href="https://wa.me/97143805515" className="hero-action">
              <Icon name="whatsapp" size={18} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
        
        <div className="year-badge">
          <Icon name="medal" size={20} />
          Setting the Standard since 2011
        </div>
        
        <a href="https://www.google.com/search?q=silberarrows+dubai+reviews" target="_blank" rel="noopener noreferrer" className="hero-trust-badge">
          <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div className="rating-stars">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <span className="rating-value">4.7</span>
          <span className="divider"></span>
          <span className="rating-count">483 Reviews</span>
        </a>
      </div>
    </section>
  );
} 