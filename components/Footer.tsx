'use client';
import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import SpinWheel from './SpinWheel';

function getBusinessStatus(): { isOpen: boolean; message: string } {
  const now = new Date();
  const dubaiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
  const day = dubaiTime.getDay();
  const hour = dubaiTime.getHours();
  
  const isWorkDay = day >= 1 && day <= 6;
  const isWorkHours = hour >= 8 && hour < 18;
  const isOpen = isWorkDay && isWorkHours;
  
  return { isOpen, message: isOpen ? 'Open Now' : 'Closed' };
}

const Footer: React.FC = () => {
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [originalButtonRect, setOriginalButtonRect] = useState<DOMRect | null>(null);
  const [businessStatus, setBusinessStatus] = useState({ isOpen: true, message: 'Open Now' });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setBusinessStatus(getBusinessStatus());
    const interval = setInterval(() => {
      setBusinessStatus(getBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSpinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Don't trigger if already animating
    if (isAnimating) return;
    
    // Start the cinematic animation (don't hide original yet)
    startButtonToModalAnimation();
  };

  const startButtonToModalAnimation = () => {
    if (!buttonRef.current) return;
    
    setIsAnimating(true);
    
    // Get button's current position and store it for reverse animation
    const buttonRect = buttonRef.current.getBoundingClientRect();
    setOriginalButtonRect(buttonRect);
    
    // Create a visual clone that looks like the button
    const buttonClone = document.createElement('div');
    buttonClone.id = 'animated-button-clone';
    buttonClone.className = 'spin-to-win-btn'; // Use same CSS class for styling
    buttonClone.style.position = 'fixed';
    buttonClone.style.left = `${buttonRect.left}px`;
    buttonClone.style.top = `${buttonRect.top}px`;
    buttonClone.style.width = `${buttonRect.width}px`;
    buttonClone.style.height = `${buttonRect.height}px`;
    buttonClone.style.margin = '0';
    buttonClone.style.padding = '0';
    buttonClone.style.border = 'none';
    buttonClone.style.boxSizing = 'border-box';
    buttonClone.style.zIndex = '9999'; // Lower than modal z-index (10000)
    buttonClone.style.transition = 'all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
    
    // Add the button content (sparkles, center hub, text)
    buttonClone.innerHTML = `
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="sparkle"></div>
      <div class="center-hub"></div>
      <span>Spin to Win</span>
    `;
    
    // Add to body
    document.body.appendChild(buttonClone);
    
    // Calculate target position to match wheel center in modal
    const isMobile = window.innerWidth <= 480;
    const wheelSize = isMobile ? 220 : 320;
    // Modal structure: padding-top(20) + title(~25) + title-margin(18) + game-display(136) + wheel-margin(5) + wheel-radius
    const wheelCenterY = 20 + 25 + 18 + 136 + 5 + (wheelSize / 2);
    
    // Give clone a moment to be fully created and positioned, then seamlessly replace original
    setTimeout(() => {
      // Now hide the original button - clone is already in exact same position
      if (buttonRef.current) {
        buttonRef.current.style.visibility = 'hidden';
      }
    }, 50);
    
    // Start moving the clone up after original is hidden
    setTimeout(() => {
      buttonClone.style.top = `${wheelCenterY - buttonRect.height/2}px`;
    }, 150);
    
    // Open modal after animation completes (but keep clone for reverse animation)
    setTimeout(() => {
      setIsSpinWheelOpen(true);
      setIsAnimating(false);
    }, 1400); // Match 1.2s animation duration + 150ms delay + small buffer
  };

  const handleCloseSpinWheel = () => {
    setIsSpinWheelOpen(false);
    startReverseAnimation();
  };

  const startReverseAnimation = () => {
    if (!originalButtonRect) return;
    
    const buttonClone = document.getElementById('animated-button-clone');
    if (!buttonClone) return;
    
    setIsAnimating(true);
    
    // Animate clone back to original position
    buttonClone.style.transition = 'all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
    buttonClone.style.top = `${originalButtonRect.top}px`;
    
    // After reverse animation completes, clean up and restore original button
    setTimeout(() => {
      // Remove the clone
      if (buttonClone) {
        buttonClone.remove();
      }
      
      // Restore original button
      if (buttonRef.current) {
        buttonRef.current.style.visibility = 'visible';
      }
      
      // Reset states
      setIsAnimating(false);
      setOriginalButtonRect(null);
    }, 1400); // Match 1.2s animation duration + small buffer
  };

  return (
    <>
      <div className="mobile-footer" style={{ height: '90px', minHeight: '90px' }}>
        <div className="footer-content">
          <div className="footer-status-row">
            <span className={`footer-status ${businessStatus.isOpen ? 'open' : 'closed'}`}>
              <span className="status-dot"></span>
              {businessStatus.message}
            </span>
            <span className="footer-hours">Call 8AM-6PM · WhatsApp 24/7</span>
          </div>
          <div className="footer-actions">
            <a href="tel:+97143805515" className="footer-action">
              <Icon name="phone" size={20} variant="white" />
              <span>Call Now</span>
            </a>
            
            <button 
              ref={buttonRef}
              onClick={handleSpinClick}
              className="spin-to-win-btn" 
              id="spinToWinBtn"
              disabled={isAnimating}
              style={{
                width: '70px',
                height: '70px',
                flexShrink: 0,
                position: 'relative'
              }}
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
