'use client';

import { useState } from 'react';
import ContactFormModal from './ContactFormModal';

export function HeroCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="hero-cta-container">
      <button 
        className="hero-cta quote-trigger"
        onClick={() => setIsModalOpen(true)}
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
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
