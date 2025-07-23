'use client';
import React, { useState } from 'react';
import Icon from './Icon';
import SpinWheel from './SpinWheel';

const Footer: React.FC = () => {
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);

  const handleSpinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSpinWheelOpen(true);
  };

  const handleCloseSpinWheel = () => {
    setIsSpinWheelOpen(false);
  };

  return (
    <>
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
      
      <SpinWheel 
        isOpen={isSpinWheelOpen} 
        onClose={handleCloseSpinWheel} 
      />
    </>
  );
};

export default Footer;
