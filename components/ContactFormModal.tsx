'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+971',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Focus trap and escape key handler
  useEffect(() => {
    if (isOpen) {
      // Focus first input when modal opens
      setTimeout(() => firstInputRef.current?.focus(), 100);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (!/^\d{7,15}$/.test(formData.phone.trim())) {
      setError('Please enter a valid phone number (digits only)');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          countryCode: formData.countryCode.trim(),
          phone: formData.phone.trim(),
          source: window.location.pathname
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit');
      }
      
      // Redirect to thank you page
      router.push('/thank-you/service');
      
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Something went wrong. Please try again or call us directly.');
      setIsSubmitting(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div 
      className="contact-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button 
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <span></span>
          <span></span>
        </button>
        
        <div className="contact-modal-content">
          <h2 id="contact-modal-title">Get in Touch</h2>
          <p className="contact-modal-subtitle">
            Enter your details and we&apos;ll contact you shortly
          </p>
          
          <form onSubmit={handleSubmit} className="contact-modal-form">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                ref={firstInputRef}
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact-phone">Phone Number</label>
              <div className="phone-input-group">
                <input
                  id="contact-country-code"
                  type="text"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                  className="country-code-input"
                  disabled={isSubmitting}
                  aria-label="Country code"
                />
                <input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    // Only allow digits
                    const value = e.target.value.replace(/\D/g, '');
                    setFormData({ ...formData, phone: value });
                  }}
                  placeholder="50 123 4567"
                  className="phone-number-input"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            {error && (
              <div className="form-error">{error}</div>
            )}
            
            <button 
              type="submit" 
              className="contact-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Connecting...' : (
                <>
                  <span className="live-indicator"></span>
                  WhatsApp Me Now
                </>
              )}
            </button>
          </form>
          
          <p className="contact-modal-privacy">
            <span className="live-badge">
              <span className="live-dot"></span>
              Live
            </span>
            We typically respond within minutes on WhatsApp
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
