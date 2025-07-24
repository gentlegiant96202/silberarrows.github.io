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
      </div>
    </section>
  );
} 