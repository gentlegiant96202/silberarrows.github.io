// Smoothly adjust hero content padding to account for fixed header height
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavContainer = document.querySelector('.mobile-nav-container');
  const body = document.body;

  // Hero-specific functionality (only run if hero exists)
  if (header && hero) {
    const setHeroPadding = () => {
      const headerHeight = header.offsetHeight;
      // Small gap between header and hero content
      hero.style.paddingTop = `${headerHeight - 10}px`;
    };

    // Set padding on initial load
    setHeroPadding();

    // Adjust padding on window resize
    window.addEventListener('resize', setHeroPadding);
  }

  // Handle hero quote button (only if hero elements exist)
  const heroQuoteButton = document.querySelector('.hero-cta.quote-trigger');
  const heroContactActions = document.querySelector('.hero-contact-actions');
  
  if (heroQuoteButton && heroContactActions) {
    heroQuoteButton.addEventListener('click', () => {
      heroQuoteButton.classList.add('hide');
      heroContactActions.classList.add('active');
    });

    // Close hero contact options when clicking outside
    document.addEventListener('click', (event) => {
      const isHeroClick = event.target.closest('.hero-cta-container');
      if (!isHeroClick && heroContactActions.classList.contains('active')) {
        heroQuoteButton.classList.remove('hide');
        heroContactActions.classList.remove('active');
      }
    });
  }

  // Mobile navigation functionality (always run if elements exist)
  if (mobileNavToggle && mobileNavContainer) {
    const closeMenu = () => {
      mobileNavToggle.classList.remove('active');
      mobileNavContainer.classList.remove('active');
      body.classList.remove('no-scroll');
      body.classList.remove('menu-open');
    };

    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNavToggle.classList.toggle('active');
      mobileNavContainer.classList.toggle('active');
      body.classList.toggle('no-scroll');
      body.classList.toggle('menu-open');
    });

    // Close button functionality
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-container .nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInside = mobileNavContainer.contains(event.target) || 
                          mobileNavToggle.contains(event.target) ||
                          (mobileNavClose && mobileNavClose.contains(event.target));
      
      if (!isClickInside && mobileNavContainer.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // Animated Reveal on Scroll
  const animatedSections = document.querySelectorAll('.why-choose-us-section, .warranty-section, .service-detail');

  if (animatedSections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedSections.forEach(section => {
      observer.observe(section);
    });
  }

  // Contract quote button functionality
  const contractQuoteButtons = document.querySelectorAll('.contract-btn.quote-trigger');
  const contractActions = document.querySelectorAll('.contract-contact-actions');

  contractQuoteButtons.forEach((button, index) => {
    const actions = contractActions[index];
    if (button && actions) {
      button.addEventListener('click', () => {
        button.classList.add('hide');
        actions.classList.add('active');
      });
    }
  });

  // Close contract actions when clicking outside
  document.addEventListener('click', (event) => {
    const isContractClick = event.target.closest('.contract-cta');
    if (!isContractClick) {
      contractQuoteButtons.forEach(button => button.classList.remove('hide'));
      contractActions.forEach(actions => actions.classList.remove('active'));
    }
  });

  // Spin to Win Wheel - Clean Implementation
  function initializeSpinWheel() {
    const spinBtn = document.getElementById('spinToWinBtn');
    
    if (!spinBtn) {
      setTimeout(initializeSpinWheel, 500);
      return;
    }
    
         let isWheelOpen = false;
     let isSpinning = false;
     let currentSpin = 1;
     let maxSpins = 5;
     let allSpinsComplete = false;
    
    // Add required CSS styles
    if (!document.getElementById('spin-wheel-styles')) {
      const style = document.createElement('style');
      style.id = 'spin-wheel-styles';
      style.textContent = `
        .wheel-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .wheel-modal.active {
          opacity: 1;
        }
        
                 .wheel-title {
           color: #FCF6BA;
           font-size: 28px;
           font-weight: bold;
           font-family: 'Montserrat', sans-serif;
           text-align: center;
           margin-bottom: 20px;
           text-shadow: 0 2px 10px rgba(191, 149, 63, 0.5);
         }
         
         .spin-counter {
           color: #BF953F;
           font-size: 18px;
           font-weight: bold;
           font-family: 'Montserrat', sans-serif;
           text-align: center;
           margin-bottom: 20px;
           background: rgba(191, 149, 63, 0.1);
           padding: 10px 20px;
           border-radius: 20px;
           border: 2px solid rgba(191, 149, 63, 0.3);
         }
        
                 .spin-wheel {
           position: relative;
           width: 350px;
           height: 350px;
           border-radius: 50%;
           margin-bottom: 30px;
           box-shadow: 
             0 0 0 4px rgba(191, 149, 63, 0.4),
             0 0 40px rgba(191, 149, 63, 0.6),
             0 15px 50px rgba(0, 0, 0, 0.5);
           animation: wheelGlow 2s ease-in-out infinite alternate;
           transition: all 0.3s ease;
         }
         
         .spin-wheel.disabled {
           animation: none;
           box-shadow: 
             0 0 0 4px rgba(100, 100, 100, 0.4),
             0 0 20px rgba(100, 100, 100, 0.3),
             0 15px 50px rgba(0, 0, 0, 0.5);
           filter: grayscale(50%);
         }
        
                 .wheel-segments {
           position: absolute;
           inset: 8px;
           border-radius: 50%;
           background: conic-gradient(
             from 0deg,
             #BF953F 0deg 30deg, #2a2a2a 30deg 60deg,
             #BF953F 60deg 90deg, #2a2a2a 90deg 120deg,
             #BF953F 120deg 150deg, #2a2a2a 150deg 180deg,
             #BF953F 180deg 210deg, #2a2a2a 210deg 240deg,
             #BF953F 240deg 270deg, #2a2a2a 270deg 300deg,
             #BF953F 300deg 330deg, #2a2a2a 330deg 360deg
           );
           transition: transform 0.3s ease;
           box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
         }
         
         .wheel-segments.spinning {
           transition: transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
         }
        
        .wheel-pointer {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 25px solid #BF953F;
          z-index: 10;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6));
        }
        
        .wheel-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: linear-gradient(145deg, #FCF6BA, #BF953F);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #1a1a1a;
          z-index: 5;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
          font-family: 'Montserrat', sans-serif;
          font-weight: bold;
          font-size: 14px; 
          color: #1a1a1a;
          text-align: center; 
          line-height: 1.1;
          text-transform: uppercase;
          cursor: pointer;
        }
        
                 .wheel-label {
           position: absolute;
           pointer-events: none;
           z-index: 3;
         }
         
         .wheel-label span {
           display: block;
           font: bold 13px 'Montserrat', sans-serif;
           text-align: center;
           white-space: nowrap;
           text-shadow: 0 2px 4px rgba(0,0,0,0.8);
           transform-origin: center center;
           user-select: none;
           pointer-events: none;
         }
        
        .spin-button {
          background: linear-gradient(145deg, #BF953F, #FCF6BA);
          color: #1a1a1a;
          border: none;
          padding: 15px 35px;
          font-size: 18px;
          font-weight: bold;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(191, 149, 63, 0.4);
          margin-bottom: 20px;
        }
        
        .spin-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(191, 149, 63, 0.6);
        }
        
                 .spin-button:disabled {
           opacity: 0.6;
           cursor: not-allowed;
           transform: none;
           background: #666 !important;
           color: #999 !important;
         }
        
                 .close-wheel {
           background: transparent;
           color: #FCF6BA;
           border: 2px solid #BF953F;
           padding: 10px 25px;
           font-size: 14px;
           font-weight: bold;
           font-family: 'Montserrat', sans-serif;
           border-radius: 25px;
           cursor: pointer;
           transition: all 0.3s ease;
         }
         
         .close-wheel:hover {
           background: #BF953F;
           color: #1a1a1a;
         }
         
         .wheel-close-x {
           position: absolute;
           top: 20px;
           right: 20px;
           width: 40px;
           height: 40px;
           background: rgba(191, 149, 63, 0.8);
           border: 2px solid #FCF6BA;
           border-radius: 50%;
           color: #1a1a1a;
           font-size: 20px;
           font-weight: bold;
           cursor: pointer;
           display: flex;
           align-items: center;
           justify-content: center;
           z-index: 10002;
           transition: all 0.3s ease;
         }
         
         .wheel-close-x:hover {
           background: #FCF6BA;
           transform: scale(1.1);
         }
        
        .result-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .result-popup.active {
          opacity: 1;
        }
        
        .result-content {
          background: linear-gradient(145deg, #1a1a1a, #333);
          border: 3px solid #BF953F;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.8);
        }
        
        .result-title {
          color: #FCF6BA;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .result-prize {
          background: linear-gradient(145deg, #BF953F, #FCF6BA);
          color: #1a1a1a;
          font-size: 28px;
          font-weight: bold;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
          box-shadow: 0 8px 20px rgba(191, 149, 63, 0.4);
        }
        
        .result-actions {
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }
        
        .result-btn {
          flex: 1;
          padding: 12px 20px;
          border-radius: 25px;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          text-align: center;
          border: none;
        }
        
        .result-btn.primary {
          background: linear-gradient(145deg, #BF953F, #FCF6BA);
          color: #1a1a1a;
          box-shadow: 0 4px 15px rgba(191, 149, 63, 0.4);
        }
        
        .result-btn.secondary {
          background: #25D366;
          color: white;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        }
        
        .result-btn:hover {
          transform: translateY(-2px);
        }
        
        @keyframes wheelGlow {
          0% { box-shadow: 0 0 0 4px rgba(191, 149, 63, 0.4), 0 0 40px rgba(191, 149, 63, 0.6), 0 15px 50px rgba(0, 0, 0, 0.5); }
          100% { box-shadow: 0 0 0 4px rgba(191, 149, 63, 0.7), 0 0 60px rgba(191, 149, 63, 0.9), 0 15px 50px rgba(0, 0, 0, 0.5); }
        }
        
        @media (max-width: 480px) {
          .spin-wheel { width: 280px; height: 280px; }
          .wheel-center { width: 80px; height: 80px; font-size: 12px; }
          .wheel-title { font-size: 22px; }
          .wheel-label span { font-size: 11px; }
           }
        `;
        document.head.appendChild(style);
      }
      
    // Create wheel modal
    function createWheelModal() {
      const modal = document.createElement('div');
      modal.className = 'wheel-modal';
             modal.innerHTML = `
         <button class="wheel-close-x">×</button>
         <h2 class="wheel-title">Spin to Win Amazing Prizes!</h2>
         <div class="spin-counter">Spin ${currentSpin} of ${maxSpins}${currentSpin === maxSpins ? ' - FINAL SPIN!' : ''}</div>
         <div class="spin-wheel">
           <div class="wheel-segments"></div>
           <div class="wheel-pointer"></div>
           <div class="wheel-center">Spin<br>to<br>Win</div>
         </div>
         <button class="spin-button">${currentSpin === maxSpins ? 'FINAL SPIN' : 'Spin the Wheel'}</button>
         <button class="close-wheel">Close</button>
       `;
      
                    // Add prize labels that rotate with the wheel segments
       const wheel = modal.querySelector('.spin-wheel');
       const segments = modal.querySelector('.wheel-segments');
       const prizes = [1000, 50, 900, 100, 800, 200, 700, 250, 600, 300, 500, 400];
       const textRadius = 120; // Distance from center to place text
       
       prizes.forEach((amount, index) => {
         const segmentAngle = 30; // Each segment is 30 degrees
         const midAngle = index * segmentAngle + 15; // Center angle of this segment
         
         const label = document.createElement('div');
         label.className = 'wheel-label';
         label.style.position = 'absolute';
         label.style.left = '50%';
         label.style.top = '50%';
         label.style.transform = `translate(-50%, -50%) rotate(${midAngle}deg)`;
         label.style.transformOrigin = 'center center';
         label.style.pointerEvents = 'none';
         label.style.zIndex = '3';
         
         const span = document.createElement('span');
         span.textContent = `AED ${amount}`;
         span.style.position = 'absolute';
         span.style.left = '50%';
         span.style.top = '50%';
         span.style.transform = `translate(-50%, -50%) translateY(-${textRadius}px) rotate(90deg)`;
         span.style.font = 'bold 13px "Montserrat", sans-serif';
         span.style.textAlign = 'center';
         span.style.whiteSpace = 'nowrap';
         span.style.userSelect = 'none';
         span.style.pointerEvents = 'none';
         span.style.color = index % 2 === 0 ? '#1a1a1a' : '#fff';
         span.style.textShadow = index % 2 === 0 ? '0 1px 3px rgba(255,255,255,0.8)' : '0 1px 3px rgba(0,0,0,0.8)';
         
         label.appendChild(span);
         // IMPORTANT: Add labels to segments so they rotate with the wheel
         segments.appendChild(label);
       });
      
      return modal;
    }
    
    // Open wheel modal
    function openWheel() {
      if (isWheelOpen) return;
      
      isWheelOpen = true;
      const modal = createWheelModal();
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
             // Reset wheel position and activate modal
       const segments = modal.querySelector('.wheel-segments');
       segments.style.transform = 'rotate(0deg)';
       setTimeout(() => modal.classList.add('active'), 50);
      
             // Add event listeners
       const spinButton = modal.querySelector('.spin-button');
       const closeButton = modal.querySelector('.close-wheel');
       const closeXButton = modal.querySelector('.wheel-close-x');
       const wheelCenter = modal.querySelector('.wheel-center');
      
             spinButton.addEventListener('click', () => spinWheel(modal));
       wheelCenter.addEventListener('click', () => spinWheel(modal));
       closeButton.addEventListener('click', () => closeWheel(modal));
       closeXButton.addEventListener('click', () => closeWheel(modal));
      
             // Close on overlay click (clicking outside the wheel)
       modal.addEventListener('click', (e) => {
         if (e.target === modal) {
           closeWheel(modal);
         }
       });
       
       // Prevent wheel area clicks from closing modal
       const wheelElement = modal.querySelector('.spin-wheel');
       wheelElement.addEventListener('click', (e) => {
         e.stopPropagation();
       });
      
      // Close on ESC key
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          closeWheel(modal);
          document.removeEventListener('keydown', handleEsc);
        }
      };
      document.addEventListener('keydown', handleEsc);
    }
    
         // Update spin display after continuing
     function updateSpinDisplay(modal) {
       const spinCounter = modal.querySelector('.spin-counter');
       const spinButton = modal.querySelector('.spin-button');
       
       if (spinCounter) {
         spinCounter.textContent = `Spin ${currentSpin} of ${maxSpins}${currentSpin === maxSpins ? ' - FINAL SPIN!' : ''}`;
       }
       
       if (spinButton && !allSpinsComplete) {
         spinButton.textContent = currentSpin === maxSpins ? 'FINAL SPIN' : 'Spin the Wheel';
         spinButton.disabled = false;
       } else if (spinButton && allSpinsComplete) {
         spinButton.textContent = 'All Spins Complete';
         spinButton.disabled = true;
         spinButton.style.opacity = '0.5';
         spinButton.style.cursor = 'not-allowed';
       }
     }
     
     // Close wheel modal
     function closeWheel(modal) {
       if (!isWheelOpen) return;
       
       isWheelOpen = false;
       currentSpin = 1; // Reset spin counter for next time
       allSpinsComplete = false; // Reset completion flag for next time
       modal.classList.remove('active');
       document.body.style.overflow = '';
       
       setTimeout(() => {
         if (modal.parentNode) {
           modal.parentNode.removeChild(modal);
         }
       }, 300);
     }
    
         // Spin the wheel
     function spinWheel(modal) {
       if (isSpinning || currentSpin > maxSpins || allSpinsComplete) return;
       
       isSpinning = true;
       const spinButton = modal.querySelector('.spin-button');
       const segments = modal.querySelector('.wheel-segments');
       
       spinButton.disabled = true;
       segments.classList.add('spinning');
       
       // 5-SPIN SYSTEM: Different prizes based on spin number
       const prizes = [1000, 50, 900, 100, 800, 200, 700, 250, 600, 300, 500, 400];
       
       // Current wheel layout (pointer at top, between 400 and 1000):
       // 0-30°: 1000    30-60°: 50     60-90°: 900    90-120°: 100
       // 120-150°: 800  150-180°: 200  180-210°: 700  210-240°: 250  
       // 240-270°: 600  270-300°: 300  300-330°: 500  330-360°: 400
       
       // Prize selection based on spin number
       let targetPrize, targetPrizeIndex;
       
       if (currentSpin <= 4) {
         // Spins 1-4: Random choice between 100, 250, 300, 50 AED
         const availablePrizes = [100, 250, 300, 50];
         const availableIndices = [3, 7, 9, 1]; // Corresponding indices
         const randomChoice = Math.floor(Math.random() * availablePrizes.length);
         targetPrize = availablePrizes[randomChoice];
         targetPrizeIndex = availableIndices[randomChoice];
       } else {
         // Spin 5: Always 500 AED
         targetPrize = 500;
         targetPrizeIndex = 10; // Index of 500 AED
       }
       
       const selectedPrize = targetPrize;
       
       // Calculate rotation to bring target segment to pointer (top = 0°)
       const segmentAngle = 30;
       const targetSegmentCenter = targetPrizeIndex * segmentAngle + (segmentAngle / 2);
       
       // PRECISE FIX: Calculate exact rotation for target segment
       const baseRotations = Math.floor(5 + Math.random() * 3); // Full rotations only
       const targetFinalPosition = 360 - targetSegmentCenter; // Precise positioning
       const totalRotation = (baseRotations * 360) + targetFinalPosition;
       
       // Apply the rotation with proper easing
       segments.style.transform = `rotate(${totalRotation}deg)`;
       
              // Debug verification - 5-spin system
       console.log(`🎯 5-SPIN SYSTEM DEBUG:`);
       console.log(`🎯 Current spin: ${currentSpin} of ${maxSpins}`);
       console.log(`🎯 Targeting: ${targetPrize} AED at index ${targetPrizeIndex}`);
       console.log(`🎯 Target segment: ${targetPrizeIndex * 30}° to ${(targetPrizeIndex + 1) * 30}°`);
       console.log(`🎯 Target center: ${targetSegmentCenter}°`);
       console.log(`🎯 Target final position: ${targetFinalPosition}°`);
       console.log(`🎯 Total rotation: ${totalRotation}°`);
       console.log(`🎯 Final position: ${totalRotation % 360}°`);
       
                // Show result after spin completes
          setTimeout(() => {
           segments.classList.remove('spinning');
           isSpinning = false;
           
           // INCREMENT SPIN COUNT IMMEDIATELY after each spin
           currentSpin++;
           
           // Disable wheel completely after 5th spin
           if (currentSpin > maxSpins) {
             allSpinsComplete = true;
             console.log('🔒 WHEEL DISABLED: All 5 spins completed!');
             spinButton.disabled = true;
             spinButton.textContent = 'All Spins Complete';
             spinButton.style.opacity = '0.5';
             spinButton.style.cursor = 'not-allowed';
             
             // Also disable wheel center clicking
             const wheelCenter = modal.querySelector('.wheel-center');
             if (wheelCenter) {
               wheelCenter.style.pointerEvents = 'none';
               wheelCenter.style.opacity = '0.5';
               wheelCenter.style.cursor = 'not-allowed';
             }
             
             // Disable the entire wheel for clicking
             const wheelElement = modal.querySelector('.spin-wheel');
             if (wheelElement) {
               wheelElement.style.pointerEvents = 'none';
               wheelElement.style.opacity = '0.7';
               wheelElement.classList.add('disabled');
             }
        } else {
             spinButton.disabled = false;
           }
           
           // VERIFY: Check where wheel actually landed
           const finalRotation = totalRotation % 360;
           console.log(`🔍 LANDING VERIFICATION:`);
           console.log(`🔍 Wheel stopped at: ${finalRotation}° rotation`);
           
           // Calculate which segment is now under the pointer (0°)
           const segmentAtPointer = Math.floor(((360 - finalRotation) % 360) / 30);
           const prizeAtPointer = prizes[segmentAtPointer];
           
           console.log(`🔍 Segment under pointer: ${segmentAtPointer}`);
           console.log(`🔍 Prize at pointer: ${prizeAtPointer} AED`);
           console.log(`🔍 Prize we're awarding: ${selectedPrize} AED`);
           console.log(`🔍 Match: ${prizeAtPointer === selectedPrize ? '✅ CORRECT' : '❌ MISMATCH'}`);
           
           // Bigger pause to let wheel settle and build anticipation
           setTimeout(() => {
             showResult(selectedPrize, modal);
           }, 2000);
         }, 4000);
     }
    
         // Show result popup with claim/continue options
     function showResult(prize, wheelModal) {
       const isLastSpin = currentSpin >= maxSpins;
       const resultPopup = document.createElement('div');
       resultPopup.className = 'result-popup';
       
       resultPopup.innerHTML = `
         <div class="result-content">
           <h3 class="result-title">Congratulations!</h3>
           <div class="result-prize">You Won AED ${prize}!</div>
           <p style="color: #fff; margin: 20px 0; font-size: 16px;">
             ${isLastSpin ? 'This is your final prize!' : `Spin ${currentSpin} of ${maxSpins} complete!`}
           </p>
           <p style="color: #BF953F; font-size: 14px; margin: 15px 0;">
             ${isLastSpin ? 'Contact us to claim your prize!' : 'Claim this prize now or continue spinning for bigger rewards!'}
           </p>
           
           <div class="result-actions">
             <a href="tel:+97143805515" class="result-btn primary">Call to Claim</a>
             <a href="https://wa.me/+97143805515" class="result-btn secondary">WhatsApp</a>
          </div>
           
            ${!isLastSpin ? `
             <button class="result-btn continue-spinning" style="background: linear-gradient(145deg, #BF953F, #FCF6BA); color: #1a1a1a; margin-top: 15px; width: 100%;">
               Continue Spinning (${maxSpins - currentSpin} spins left)
              </button>
            ` : ''}
           
           <button class="result-btn close-popup" style="background: transparent; color: #FCF6BA; border: 2px solid #BF953F; margin-top: 10px; width: 100%;">
             ${isLastSpin ? 'Close' : 'Continue Later'}
           </button>
        </div>
      `;
      
             document.body.appendChild(resultPopup);
       setTimeout(() => resultPopup.classList.add('active'), 50);
       
       // Prevent result popup from closing when clicking outside
       resultPopup.addEventListener('click', (e) => {
         e.stopPropagation();
       });
       
       // Prevent clicks on result content from bubbling
       const resultContent = resultPopup.querySelector('.result-content');
       resultContent.addEventListener('click', (e) => {
         e.stopPropagation();
       });
      
             // Handle Continue Spinning button
       const continueBtn = resultPopup.querySelector('.continue-spinning');
       if (continueBtn) {
         continueBtn.addEventListener('click', () => {
           currentSpin++;
           resultPopup.classList.remove('active');
           setTimeout(() => {
             if (resultPopup.parentNode) {
               resultPopup.parentNode.removeChild(resultPopup);
             }
             // Reset wheel and update UI for next spin
             const modalSegments = wheelModal.querySelector('.wheel-segments');
             if (modalSegments) {
               modalSegments.style.transform = 'rotate(0deg)';
             }
             // Update spin counter and button text
             updateSpinDisplay(wheelModal);
           }, 300);
         });
       }
       
       // Handle Close/Continue Later button
       const closeBtn = resultPopup.querySelector('.close-popup');
       closeBtn.addEventListener('click', () => {
         resultPopup.classList.remove('active');
         setTimeout(() => {
           if (resultPopup.parentNode) {
             resultPopup.parentNode.removeChild(resultPopup);
           }
           // Reset wheel to starting position
           const modalSegments = wheelModal.querySelector('.wheel-segments');
           if (modalSegments) {
             modalSegments.style.transform = 'rotate(0deg)';
           }
         }, 300);
       });
    }
    
    // Attach to spin button
    spinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openWheel();
    });
  }
  
  // Initialize wheel
  initializeSpinWheel();
}); 