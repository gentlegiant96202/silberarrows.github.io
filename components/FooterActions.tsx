'use client';

import React, { useState } from 'react';
import Icon from './Icon';
import ContactFormModal from './ContactFormModal';

export default function FooterActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="footer-actions">
        <button 
          className="footer-action"
          onClick={() => setIsModalOpen(true)}
        >
          <Icon name="phone" size={20} variant="dark" />
          <span>Contact Us</span>
        </button>
      </div>
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
