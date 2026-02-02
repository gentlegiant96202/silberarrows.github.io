'use client';

import { useState } from 'react';
import Icon from './Icon';

export function HeroCTA() {
  const [showContactActions, setShowContactActions] = useState(false);

  return (
    <div className="hero-cta-container" onClick={() => setShowContactActions(false)}>
      <button 
        className={`hero-cta quote-trigger ${showContactActions ? 'hide' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowContactActions(true);
        }}
      >
        <div className="cta-main-row">
          <span>GET A FREE QUOTE</span>
          <span className="cta-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
        <div className="cta-status open">
          <span className="status-dot"></span>
          <span className="status-text">Speak to a Service Advisor</span>
        </div>
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
  );
}
