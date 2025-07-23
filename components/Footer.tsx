import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

const Footer: React.FC = () => {
  return (
    <div className="mobile-footer">
      <div className="footer-content">
        <div className="footer-actions">
          <a href="tel:+97143805515" className="footer-action">
            <FontAwesomeIcon icon={faPhone as IconProp} />
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
            <FontAwesomeIcon icon={faWhatsapp as IconProp} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
