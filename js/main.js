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

  // Services tab functionality is handled by inline script in HTML

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

  // Spin to Win Wheel Expansion Functionality
  function initializeWheelExpansion() {
    const spinBtn = document.getElementById('spinToWinBtn');
    
    if (!spinBtn) {
      console.log('Button not found, retrying in 500ms...');
      setTimeout(initializeWheelExpansion, 500);
      return;
    }
    
    let overlay = null;
    let closeBtn = null;
    let isExpanded = false;
    // Create overlay and close button elements
    function createElements() {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'wheel-overlay';
        document.body.appendChild(overlay);
      }
      
      if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.className = 'wheel-close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Close');
        document.body.appendChild(closeBtn);
      }
    }
    
    // Expand wheel function
    function expandWheel() {
      if (isExpanded) return;
      
      isExpanded = true;
      createElements();
      
      // Keep neonPulse glow but disable scale bounce to avoid transform conflict
      spinBtn.style.animation = 'neonPulse 2s ease-in-out infinite alternate';

      // Get current position (centre of button)
      const rect = spinBtn.getBoundingClientRect();
      const startCenterX = rect.left + rect.width / 2;
      const startCenterY = rect.top + rect.height / 2;

      // Calculate viewport centre
      const viewportHeight = (window.visualViewport && visualViewport.height) || window.innerHeight;
      const viewportWidth = window.innerWidth;
      const targetCenterX = viewportWidth / 2;
      const targetCenterY = viewportHeight / 2;

      const deltaX = targetCenterX - startCenterX;
      const deltaY = targetCenterY - startCenterY;

      // Prepare transition
      spinBtn.style.setProperty('transition','transform 0.45s cubic-bezier(.25,.46,.45,.94)','important');
      const translateValue = `translate(${deltaX}px, ${deltaY}px)`;
      spinBtn.style.setProperty('transform', translateValue,'important');
      // Flag so we know translate was applied
      spinBtn.dataset.expanded = 'true';

      // After centering animation completes, show large wheel once
      const handleTransitionEnd = () => {
        spinBtn.removeEventListener('transitionend', handleTransitionEnd);

        createActualSpinningWheel();
        overlay.classList.add('active');
        spinBtn.style.opacity = '0';

        const realWheel = document.getElementById('actual-spinning-wheel');
        if (realWheel) {
          realWheel.classList.add('visible');
        }

        closeBtn.classList.add('visible');
        document.body.style.overflow = 'hidden';
      };

      spinBtn.addEventListener('transitionend', handleTransitionEnd, {once:true});
    }
    
    // Collapse wheel function
    function collapseWheel() {
      if (!isExpanded) return;
      
      isExpanded = false;
      
      // Hide overlay, close button immediately and remove spinning wheel
      overlay.classList.remove('active');
      closeBtn.classList.remove('visible');
      removeActualSpinningWheel();
      
      // Fade button back in and animate to original spot
      spinBtn.style.opacity = '1';

      if (spinBtn.dataset.expanded === 'true') {
        // Animate back
        requestAnimationFrame(() => {
          spinBtn.style.setProperty('transition','transform 0.45s cubic-bezier(.25,.46,.45,.94)','important');
          spinBtn.style.setProperty('transform','translate(0,0)','important');
        });

        const resetButton = () => {
          spinBtn.removeEventListener('transitionend', resetButton);
          spinBtn.classList.remove('anticipating');
          spinBtn.removeAttribute('style');
          spinBtn.style.animation = '';
          delete spinBtn.dataset.expanded;
          // Restore body scroll
          document.body.style.overflow = '';
        };
        spinBtn.addEventListener('transitionend', resetButton, {once:true});
      } else {
        // Fallback immediate reset
        spinBtn.removeAttribute('style');
        spinBtn.style.animation = '';
        document.body.style.overflow = '';
      }
    }
    

    

    

    
    // Create actual spinning wheel identical to footer button
    function createActualSpinningWheel() {
      console.log('Creating actual spinning wheel...');
      const existing = document.getElementById('actual-spinning-wheel');
      if (existing) {
        console.log('Wheel already exists');
        return;
      }
      const wheel = document.createElement('div');
      wheel.id = 'actual-spinning-wheel';
      wheel.className = 'actual-spinning-wheel';
      wheel.innerHTML = `
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="sparkle"></div>
        <div class="center-hub">
          <span>Spin<br>to<br>Win</span>
        </div>`;
      document.body.appendChild(wheel);
      console.log('Wheel created and added to body:', wheel);
      wheel.addEventListener('click', startWheelSpin, {passive:true});
      wheel.addEventListener('touchend', startWheelSpin, {passive:true});
    }
    
    // Remove actual spinning wheel
    function removeActualSpinningWheel() {
      const wheel = document.getElementById('actual-spinning-wheel');
      if (wheel) {
        wheel.classList.remove('visible');
        setTimeout(() => {
          wheel.remove();
        }, 400);
      }
    }
    
    // Start the wheel spinning game
    function startWheelSpin(e) {
      e.preventDefault();
      e.stopPropagation();
      const wheel = document.getElementById('actual-spinning-wheel');
      if (!wheel || wheel.classList.contains('spinning')) return;
      
      wheel.classList.add('spinning');
      const spins = 3 + Math.random() * 3;
      const finalAngle = Math.random() * 360;
      const total = (spins * 360) + finalAngle;
      
      wheel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
      wheel.style.transform = `translate(-50%, -50%) rotate(${total}deg)`;
      
      setTimeout(() => {
        wheel.classList.remove('spinning');
        // Calculate which segment landed
        const segmentAngle = 30; // 360/12 segments
        const normalizedAngle = (360 - (finalAngle % 360)) % 360;
        const segmentNumber = Math.floor(normalizedAngle / segmentAngle) + 1;
        showWinResult(segmentNumber);
      }, 3000);
    }
    
    // Show winning result
    function showWinResult(segmentNumber) {
      const prizes = {
        1: 'FREE SERVICE',
        2: '20% OFF',
        3: 'FREE CHECKUP', 
        4: '10% OFF',
        5: 'BRAKE SPECIAL',
        6: '5% OFF',
        7: 'FREE QUOTE',
        8: '15% OFF',
        9: 'AC SERVICE',
        10: 'TRY AGAIN',
        11: 'BATTERY CHECK',
        12: '25% OFF'
      };
      
      const prize = prizes[segmentNumber] || 'TRY AGAIN';
      
      // Create result popup
      const result = document.createElement('div');
      result.className = 'wheel-result';
      result.innerHTML = `
        <div class="result-content">
          <h2>🎉 CONGRATULATIONS! 🎉</h2>
          <div class="prize-won">${prize}</div>
          <p>Contact us to claim your prize!</p>
          <div class="result-actions">
            <a href="tel:+97143805515" class="claim-btn">📞 Call Now</a>
            <a href="https://wa.me/+97143805515" class="claim-btn">💬 WhatsApp</a>
          </div>
        </div>
      `;
      
      document.body.appendChild(result);
      
      setTimeout(() => {
        result.classList.add('visible');
      }, 100);
      
      // Auto remove after 10 seconds
      setTimeout(() => {
        result.classList.remove('visible');
        setTimeout(() => result.remove(), 300);
      }, 10000);
    }
    
    // Wheel click/touch events for better mobile support
    function handleWheelInteraction(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!isExpanded) {
        expandWheel();
      }
    }
    
    spinBtn.addEventListener('click', handleWheelInteraction);
    spinBtn.addEventListener('touchend', handleWheelInteraction);
    
    // Close button click
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('wheel-close-btn')) {
        collapseWheel();
      }
    });
    
    // Overlay click to close
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('wheel-overlay')) {
        collapseWheel();
      }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isExpanded) {
        collapseWheel();
      }
    });
  }
  
  // Start the initialization
  initializeWheelExpansion();
}); 