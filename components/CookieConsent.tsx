'use client';

import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    } else {
      // Initialize tracking if consent was given
      if (consent === 'accepted') {
        initializeTracking();
      }
    }
  }, []);

  const initializeTracking = () => {
    // Enable Google Analytics and Ads tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
    initializeTracking();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
    
    // Disable tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
  };

  if (!showConsent) return null;

  return (
    <>
      <style jsx>{`
        .cookie-consent {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(26, 26, 26, 0.98);
          backdrop-filter: blur(10px);
          border-top: 2px solid rgba(156, 163, 175, 0.3);
          padding: 20px;
          z-index: 10001;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .cookie-text {
          color: #F3F4F6;
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          line-height: 1.5;
          flex: 1;
          min-width: 250px;
        }

        .cookie-text a {
          color: #9CA3AF;
          text-decoration: underline;
        }

        .cookie-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cookie-btn {
          padding: 10px 20px;
          border-radius: 6px;
          font-family: 'Impact', sans-serif;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          white-space: nowrap;
        }

        .cookie-btn-accept {
          background: linear-gradient(145deg, #9CA3AF, #F3F4F6);
          color: #1a1a1a;
        }

        .cookie-btn-accept:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(156, 163, 175, 0.4);
        }

        .cookie-btn-decline {
          background: transparent;
          color: #9CA3AF;
          border: 1px solid rgba(156, 163, 175, 0.4);
        }

        .cookie-btn-decline:hover {
          background: rgba(156, 163, 175, 0.1);
          color: #F3F4F6;
        }

        @media (max-width: 768px) {
          .cookie-consent {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }

          .cookie-text {
            font-size: 13px;
            min-width: auto;
          }

          .cookie-buttons {
            justify-content: center;
            width: 100%;
          }

          .cookie-btn {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>

      <div className="cookie-consent">
        <div className="cookie-text">
          We use cookies to improve your experience and for analytics. 
          By continuing, you agree to our use of cookies for website analytics and advertising. 
          <a href="/privacy-policy" target="_blank">Learn more</a>
        </div>
        <div className="cookie-buttons">
          <button 
            className="cookie-btn cookie-btn-decline"
            onClick={handleDecline}
          >
            Decline
          </button>
          <button 
            className="cookie-btn cookie-btn-accept"
            onClick={handleAccept}
          >
            Accept All
          </button>
        </div>
      </div>
    </>
  );
};

export default CookieConsent; 