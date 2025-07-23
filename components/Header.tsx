import React from 'react';

const Header: React.FC = () => {
  return (
    <div id="header-placeholder" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: '80px',
      background: 'rgba(18, 18, 18, 0.5)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <header>
        <div className="logo-container">
          <a href="/">
            <img src="/assets/icons/logo.svg" alt="Silber Arrows Logo" className="logo" />
          </a>
        </div>
        <div className="header-right">
          <nav className="desktop-nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/services/" className="nav-link">Services</a>
            <a href="/service-contracts/" className="nav-link">Service Contracts</a>
            <a href="/contact/" className="nav-link">Contact</a>
          </nav>
          <div className="header-contact">
            <div className="address-container">
              <i className="fas fa-map-marker-alt"></i>
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
            <div className="contact-buttons">
              <a href="tel:+97143805515" className="contact-btn phone-btn">
                <i className="fas fa-phone-alt"></i>
                <span>+971 4 380 5515</span>
              </a>
              <a href="https://wa.me/97143805515" className="contact-btn whatsapp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <button className="mobile-nav-toggle" aria-label="Toggle mobile menu">
            <span></span><span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div className="mobile-nav-container">
        <div className="mobile-nav-header">
          <div className="logo-container">
            <a href="/">
              <img src="/assets/icons/logo.svg" alt="Silber Arrows Logo" className="logo" />
            </a>
          </div>
          <button className="mobile-nav-close" aria-label="Close mobile menu">
            <span></span><span></span>
          </button>
        </div>
        <nav className="mobile-nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/services/" className="nav-link">Services</a>
          <a href="/service-contracts/" className="nav-link">Service Contracts</a>
          <a href="/contact/" className="nav-link">Contact</a>
          <div className="mobile-contact-info">
            <a href="tel:+97143805515" className="contact-btn phone-btn">
              <i className="fas fa-phone-alt"></i>
              <span>+971 4 380 5515</span>
            </a>
            <div className="address">
              <i className="fas fa-map-marker-alt"></i>
              <span>Al Manara St, Al Quoz, Dubai</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
