'use client';
import React, { useState, useEffect } from 'react';
import Icon from './Icon';

function getBusinessStatus(): { isOpen: boolean; message: string; subtext: string } {
  const now = new Date();
  const dubaiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
  const day = dubaiTime.getDay();
  const hour = dubaiTime.getHours();
  
  const isWorkDay = day >= 1 && day <= 6;
  const isWorkHours = hour >= 8 && hour < 18;
  const isOpen = isWorkDay && isWorkHours;
  
  return { 
    isOpen, 
    message: isOpen ? 'Open Now' : 'Closed',
    subtext: isOpen ? '8AM - 6PM' : 'Opens 8AM'
  };
}

const Footer: React.FC = () => {
  const [businessStatus, setBusinessStatus] = useState({ isOpen: true, message: 'Open Now', subtext: '8AM - 6PM' });

  useEffect(() => {
    setBusinessStatus(getBusinessStatus());
    const interval = setInterval(() => {
      setBusinessStatus(getBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mobile-footer" style={{ height: '70px', minHeight: '70px' }}>
      <div className="footer-content">
        <div className="footer-actions">
          <a href="tel:+97143805515" className="footer-action">
            <Icon name="phone" size={18} variant="white" />
            <span>Call</span>
          </a>
          
          <div className={`footer-status-center ${businessStatus.isOpen ? 'open' : 'closed'}`}>
            <span className="status-dot"></span>
            <div className="status-text">
              <span className="status-main">{businessStatus.message}</span>
              <span className="status-sub">{businessStatus.subtext}</span>
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
