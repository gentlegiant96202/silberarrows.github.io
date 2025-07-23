import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="mobile-footer">
      <div className="footer-content">
        <div className="footer-actions">
          <a href="tel:+97143805515" className="footer-action">
            <i className="fas fa-phone"></i>
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
            <i className="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
