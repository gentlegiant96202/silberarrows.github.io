'use client';

import React, { useState } from 'react';
import ContactFormModal from './ContactFormModal';
import Icon from './Icon';

interface ContactCTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'hero';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children?: React.ReactNode;
  iconName?: string;
  iconSize?: number;
  iconVariant?: 'white' | 'dark' | 'gold' | 'silver';
}

export default function ContactCTAButton({
  variant = 'primary',
  size = 'medium',
  className = '',
  children,
  iconName = 'phone',
  iconSize = 18,
  iconVariant = 'white'
}: ContactCTAButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseClass = 'contact-cta-btn';
  const variantClass = `contact-cta-btn--${variant}`;
  const sizeClass = `contact-cta-btn--${size}`;
  
  return (
    <>
      <button
        type="button"
        className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
        onClick={() => setIsModalOpen(true)}
      >
        {iconName && <Icon name={iconName} size={iconSize} variant={iconVariant} />}
        <span>{children || 'Call or WhatsApp Us'}</span>
      </button>
      
      <ContactFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
