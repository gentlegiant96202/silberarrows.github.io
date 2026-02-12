import React from 'react';
import FooterActions from './FooterActions';

const Footer: React.FC = () => {
  return (
    <>
      <div className="mobile-footer" style={{ height: '100px', minHeight: '100px' }}>
        <div className="footer-content">
          <FooterActions />
        </div>
      </div>
    </>
  );
};

export default Footer;
