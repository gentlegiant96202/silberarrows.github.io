'use client';
import React from 'react';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <div className="mobile-footer" style={{ height: '70px', minHeight: '70px' }}>
      <div className="footer-content">
        <div className="footer-actions">
          <a href="tel:+97143805515" className="footer-action">
            <Icon name="phone" size={18} variant="white" />
            <span>Call</span>
          </a>
          
          <div className="footer-status-center open">
            <span className="status-dot"></span>
            <div className="status-text">
              <span className="status-main">Open Now</span>
              <span className="status-sub">24/7</span>
            </div>
          </div>
          
          <a href="https://wa.me/97143805515" className="footer-action">
            <Icon name="whatsapp" size={18} variant="white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
