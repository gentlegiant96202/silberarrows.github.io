'use client';
import React, { useState, useRef } from 'react';
import Icon from './Icon';
import SpinWheel from './SpinWheel';

const Footer: React.FC = () => {
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [originalButtonRect, setOriginalButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSpinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Don't trigger if already animating
    if (isAnimating) return;
    
    // Start the cinematic animation (don't hide original button yet)
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
    
    // Start animation after brief delay - hide original and move clone up
    setTimeout(() => {
      // Now hide the original button just as the clone starts moving
      if (buttonRef.current) {
        buttonRef.current.style.visibility = 'hidden';
      }
      
      // Start clone animation
      buttonClone.style.top = `${wheelCenterY - buttonRect.height/2}px`;
    }, 50);
    
    // Open modal after animation completes (but keep clone for reverse animation)
    setTimeout(() => {
      setIsSpinWheelOpen(true);
      setIsAnimating(false);
    }, 1250); // Match 1.2s animation duration + small buffer
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
    }, 1250); // Match 1.2s animation duration + small buffer
  };

  return (
    <>
      <div className="mobile-footer" style={{ height: '80px', minHeight: '80px' }}>
        <div className="footer-content">
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
