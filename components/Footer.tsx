import React from 'react';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <div className="mobile-footer">
      <div className="footer-content">
        <div className="footer-actions">
          <a href="tel:+97143805515" className="footer-action">
            <Icon name="phone" size={20} />
            <span>Call Us</span>
          </a>
          
          <a href="spin-wheel.html" className="spin-to-win-btn" id="spinToWinBtn">
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="center-hub"></div>
            <span>Spin to Win</span>
          </a>
          
          <a href="https://wa.me/+97143805515" className="footer-action">
            <Icon name="whatsapp" size={20} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
