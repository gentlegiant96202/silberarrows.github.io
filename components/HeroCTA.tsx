'use client';

import { useState, useEffect } from 'react';
import Icon from './Icon';

function getBusinessStatus(): { isOpen: boolean; message: string } {
  const now = new Date();
  const dubaiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
  const day = dubaiTime.getDay();
  const hour = dubaiTime.getHours();
  
  const isWorkDay = day >= 1 && day <= 6;
  const isWorkHours = hour >= 8 && hour < 18;
  const isOpen = isWorkDay && isWorkHours;
  
  if (isOpen) {
    const closingHour = 18;
    const hoursLeft = closingHour - hour;
    if (hoursLeft <= 1) {
      return { isOpen: true, message: 'Open Now · Closes Soon' };
    }
    return { isOpen: true, message: `Open Now · Closes ${closingHour > 12 ? closingHour - 12 : closingHour}PM` };
  }
  return { isOpen: false, message: 'Closed · We\'ll respond ASAP' };
}

export function HeroCTA() {
  const [showContactActions, setShowContactActions] = useState(false);
  const [businessStatus, setBusinessStatus] = useState({ isOpen: true, message: 'Open Now' });

  useEffect(() => {
    setBusinessStatus(getBusinessStatus());
    const interval = setInterval(() => {
      setBusinessStatus(getBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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
        <div className={`cta-status ${businessStatus.isOpen ? 'open' : 'closed'}`}>
          <span className="status-dot"></span>
          <span className="status-text">{businessStatus.message}</span>
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
