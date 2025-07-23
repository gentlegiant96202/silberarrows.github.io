'use client';
import React from 'react';
import Icon from './Icon';

declare global {
  interface Window {
    initializeSpinWheel?: () => void;
  }
}

const Footer: React.FC = () => {
  const handleSpinClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if script is already loaded
    if (typeof window !== 'undefined') {
      // If already loaded, try to initialize directly
      if (window.initializeSpinWheel) {
        window.initializeSpinWheel();
        return;
      }
      
      // Check if script is already in the DOM
      if (document.querySelector('script[src="/js/spin-wheel.js"]')) {
        console.log('Spin wheel script already exists');
        return;
      }
      
      // Load the script
      const script = document.createElement('script');
      script.src = '/js/spin-wheel.js';
      script.onload = () => {
        console.log('Spin wheel script loaded successfully');
      };
      script.onerror = () => {
        console.error('Failed to load spin wheel script');
      };
      document.head.appendChild(script);
    }
  };

  return (
    <div className="mobile-footer">
      <div className="footer-content">
        <div className="footer-actions">
          <a href="tel:+97143805515" className="footer-action">
            <Icon name="phone" size={20} variant="white" />
            <span>Call Now</span>
          </a>
          
          <button 
            onClick={handleSpinClick}
            className="spin-to-win-btn" 
            id="spinToWinBtn"
          >
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="center-hub"></div>
            <span>Spin to Win</span>
          </button>
          
          <a href="https://wa.me/97143805515" className="footer-action">
            <Icon name="whatsapp" size={20} variant="white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
