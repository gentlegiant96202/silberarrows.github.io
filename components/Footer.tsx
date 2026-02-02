import React from 'react';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <>
      <div className="mobile-footer" style={{ height: '100px', minHeight: '100px' }}>
        <div className="footer-content">
          <div className="footer-actions">
            <a href="tel:+97143805515" className="footer-action">
              <Icon name="phone" size={20} variant="dark" />
              <span>Call Us</span>
            </a>
            <a href="https://wa.me/97143805515" className="footer-action">
              <Icon name="whatsapp" size={20} variant="dark" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
