'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import ContactFormModal from './ContactFormModal';

export default function PricingCTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="pricing-bottom-cta">
        <h3>Ready to Book?</h3>
        <div className="pricing-cta-buttons">
          <button 
            className="pricing-cta-btn primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon name="phone" size={18} variant="dark" />
            <span>Call or WhatsApp Us</span>
          </button>
        </div>
      </div>
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
