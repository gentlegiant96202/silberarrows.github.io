// Smoothly adjust hero content padding to account for fixed header height
document.addEventListener('DOMContentLoaded', () => {
  
  // Debug contact card buttons
  const debugContactButtons = () => {
    const actionLinks = document.querySelectorAll('.contact-card .action-link');
    actionLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        console.log(`Contact button ${index} clicked:`, link.href);
        // Force navigation for debugging
        if (link.href.startsWith('tel:')) {
          window.location.href = link.href;
        } else if (link.href.includes('wa.me')) {
          window.open(link.href, '_blank');
        }
      });
    });
  };
  
  // Initialize contact button debugging
  debugContactButtons();
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavContainer = document.querySelector('.mobile-nav-container');
  const body = document.body;

  // Mobile navigation toggle
  if (mobileNavToggle && mobileNavContainer) {
    mobileNavToggle.addEventListener('click', function() {
      mobileNavContainer.classList.add('active');
      document.body.classList.add('nav-open');
    });
  }
  
  if (mobileNavClose && mobileNavContainer) {
    mobileNavClose.addEventListener('click', function() {
      mobileNavContainer.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  }
  
  // Close mobile nav when clicking outside
  if (mobileNavContainer) {
    mobileNavContainer.addEventListener('click', function(e) {
      if (e.target === mobileNavContainer) {
        mobileNavContainer.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });
  }

  // Services Navigation JavaScript
  const servicesNavList = document.querySelector('.services-nav ul');
  const servicePanes = document.querySelectorAll('.service-pane');
  
  if (servicesNavList && servicePanes.length > 0) {
    servicesNavList.innerHTML = '';
    const mobileServiceTitles = ['Maintenance', 'Brakes', 'Tyres', 'Wheel Alignment', 'Batteries', 'AC Repair', 'Engine Repair', 'Suspension', 'Diagnostics', 'Detailing'];
    
    servicePanes.forEach((pane, index) => {
      const serviceId = pane.dataset.service;
      const serviceTitle = pane.querySelector('h3').textContent;
      const isMobile = window.innerWidth <= 768;
      const displayTitle = isMobile && mobileServiceTitles[index] ? mobileServiceTitles[index] : serviceTitle;
      
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.dataset.target = serviceId;
      button.textContent = displayTitle;
      li.appendChild(button);
      servicesNavList.appendChild(li);
    });
    
    const navItems = document.querySelectorAll('.services-nav button');
    
    if (navItems.length > 0 && servicePanes.length > 0) {
      navItems[0].classList.add('active');
      servicePanes[0].classList.add('active');
    }
    
    servicesNavList.addEventListener('click', function(e) {
      if (e.target && e.target.tagName === 'BUTTON') {
        const targetId = e.target.dataset.target;
        navItems.forEach(item => item.classList.remove('active'));
        servicePanes.forEach(pane => pane.classList.remove('active'));
        e.target.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      }
    });
  }

  // Get a Free Quote functionality - REMOVED (using improved version below)

  // Home link click prevention (prevent reload on same page)
  const homeLinks = document.querySelectorAll('a[href="/"], a[href="#"]');
  homeLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Services Navigation System
  function initializeServicesNavigation() {
    const servicesNav = document.querySelector('.services-nav ul');
    const servicePanes = document.querySelectorAll('.service-pane');
    
    // Debug logging
    console.log('🔧 Services nav init:', !!servicesNav, 'panes:', servicePanes.length, 'existing buttons:', servicesNav?.children?.length || 0);
    
    // Skip if nav doesn't exist or no panes found
    if (!servicesNav || !servicePanes.length) {
      console.log('⚠️ Services nav init failed: missing elements');
      return;
    }
    
    // Clear existing buttons to ensure fresh start
    servicesNav.innerHTML = '';

    // Service data mapping
    const serviceData = {
      'scheduled-maintenance': { title: 'Maintenance', mobileTitle: 'Maintenance' },
      'brake-service': { title: 'Brake Service', mobileTitle: 'Brakes' },
      'tyre-replacement': { title: 'Tyre Service', mobileTitle: 'Tyres' },
      'wheel-alignment': { title: 'Wheel Alignment', mobileTitle: 'Alignment' },
      'battery-replacement': { title: 'Battery Service', mobileTitle: 'Battery' },
      'ac-service': { title: 'Air Conditioning', mobileTitle: 'A/C' },
      'engine-repair': { title: 'Engine Repair', mobileTitle: 'Engine' },
      'suspension-repair': { title: 'Suspension', mobileTitle: 'Suspension' },
      'diagnostics': { title: 'Diagnostics', mobileTitle: 'Diagnostics' },
      'detailing': { title: 'Detailing', mobileTitle: 'Detailing' }
    };

    // Create navigation buttons (CSS expects buttons, not anchors)
    servicePanes.forEach((pane, index) => {
      const serviceKey = pane.getAttribute('data-service');
      const serviceInfo = serviceData[serviceKey];
      
      if (!serviceInfo) return;

      const li = document.createElement('li');
      const button = document.createElement('button');
      
      button.setAttribute('data-service', serviceKey);
      
      // Use mobile title for shorter buttons, desktop title if no mobile title
      button.textContent = serviceInfo.mobileTitle || serviceInfo.title;
      
      // Set first tab as active
      if (index === 0) {
        button.classList.add('active');
        pane.classList.add('active');
      }
      
      li.appendChild(button);
      servicesNav.appendChild(li);

      // Add click handler
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all buttons and panes
        document.querySelectorAll('.services-nav button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.service-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        document.getElementById(serviceKey).classList.add('active');
      });
    });

    // Initialize first service as active
    if (servicePanes.length > 0) {
      servicePanes[0].classList.add('active');
    }

    // Add animation class for staggered button animations
    setTimeout(() => {
      const servicesNavContainer = document.querySelector('.services-nav');
      if (servicesNavContainer) {
        servicesNavContainer.classList.add('animate-in');
      }
    }, 100);
  }

  // Initialize services navigation with retry mechanism for Next.js (only on /services)
  if (window.location.pathname !== '/services' && window.location.pathname !== '/services/') {
    // Skip legacy init on other pages (handled by React components)
    console.log('ℹ️ Skipping legacy services navigation init on non-services page');
  } else {

  function tryInitServices(attempts = 0) {
    const maxAttempts = 5;
    const servicesNav = document.querySelector('.services-nav ul');
    const servicePanes = document.querySelectorAll('.service-pane');
    
    if (servicesNav && servicePanes.length > 0) {
      console.log('✅ Services elements found, initializing...');
      initializeServicesNavigation();
    } else if (attempts < maxAttempts) {
      console.log(`🔄 Services init retry ${attempts + 1}/${maxAttempts}`);
      setTimeout(() => tryInitServices(attempts + 1), 200);
    } else {
      console.log('❌ Services init failed after all retries');
    }
  }
  
  tryInitServices();

  }

  // Additional fallback for services page specific initialization
  if (window.location.pathname === '/services' || window.location.pathname === '/services/') {
    // Extra initialization attempts for services page
    setTimeout(() => {
      console.log('🎯 Services page specific init');
      tryInitServices();
    }, 500);
    
    // Also try when page becomes visible (in case of tab switching)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(tryInitServices, 100);
      }
    });
  }

  // Hero Quote Button - Clean Implementation
  const heroQuoteButton = document.querySelector('.hero-cta.quote-trigger');
  const heroContactActions = document.querySelector('.hero-contact-actions');
  
  if (heroQuoteButton && heroContactActions) {
    // Show contact buttons when quote button is clicked
    heroQuoteButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      heroQuoteButton.classList.add('hide');
      heroContactActions.classList.add('active');
      
      console.log('Quote button clicked - showing contact actions');
    });

    // Hide contact buttons when clicking outside the hero CTA container
    document.addEventListener('click', (event) => {
      const isHeroClick = event.target.closest('.hero-cta-container');
      
      if (!isHeroClick && heroContactActions.classList.contains('active')) {
        heroQuoteButton.classList.remove('hide');
        heroContactActions.classList.remove('active');
        
        console.log('Clicked outside - hiding contact actions');
      }
    });

    // Prevent contact actions from closing when clicking inside them
    heroContactActions.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Navigation functionality is now handled by include-header.js

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

  // Services Tab Animation on Scroll
  const servicesNav = document.querySelector('.services-nav');
  
  if (servicesNav) {
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class to trigger the tab bounce-in effect
          servicesNav.classList.add('animate-in');
          servicesObserver.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% of the services section is visible
    });

    // Observe the services section container
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
      servicesObserver.observe(servicesSection);
    }
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
    
    /* ---------------------------------------------
       Supabase configuration & lazy loader
    ---------------------------------------------*/
    const SUPABASE_URL = 'https://rplhksxrekbcbhgzcjir.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGhrc3hyZWtiY2JoZ3pjamlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTI2ODUsImV4cCI6MjA2NzcyODY4NX0.Rd_12MZmCPKFeA_WePWA57m0MED6gMRjJhkxauH41D4';

    /* --------------- Confetti loader --------------- */
    let confettiReady = null;
    function loadConfetti() {
      if (confettiReady) return confettiReady;
      confettiReady = new Promise((resolve) => {
        if (window.confetti) return resolve();
        const scr = document.createElement('script');
        scr.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
        scr.onload = () => resolve();
        document.head.appendChild(scr);
      });
      return confettiReady;
    }

    let supabase;            // Supabase client instance
    let supabaseReady = null; // Promise guard

    function loadSupabase() {
      if (supabaseReady) return supabaseReady;
      supabaseReady = new Promise((resolve) => {
        if (window.supabase) {
          supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
          return resolve();
        }
        const scr = document.createElement('script');
        scr.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        scr.onload = () => {
          supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
          resolve();
        };
        document.head.appendChild(scr);
      });
      return supabaseReady;
    }
    
    if (!spinBtn) {
      setTimeout(initializeSpinWheel, 500);
      return;
    }
    
         let isWheelOpen = false;
     let isSpinning = false;
     let currentSpin = 0; // start before any spins
     let maxSpins = 5;
     let allSpinsComplete = false;
    
    // Add required CSS styles
    if (!document.getElementById('spin-wheel-styles')) {
      const style = document.createElement('style');
      style.id = 'spin-wheel-styles';
      style.textContent = `
        @font-face {
          font-family: 'Impact';
          src: url('/assets/fonts/impact.ttf') format('truetype');
        }
        
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
          justify-content: flex-start;
          padding-top: 40px;
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
          overflow-y: auto;
        }
        
        .wheel-modal.active {
          opacity: 1;
        }
        
                 .wheel-title {
           color: #F3F4F6;
           font-size: 22px;
           font-weight: normal;
           font-family: 'Impact', 'Arial Black', sans-serif;
           text-align: center;
           margin-bottom: 15px;
           margin-top: 0;
           text-shadow: 0 2px 10px rgba(156, 163, 175, 0.5);
         }
         
         .spin-counter {
           color: #9CA3AF;
           font-size: 18px;
           font-weight: normal;
           font-family: 'Impact', 'Arial Black', sans-serif;
           text-align: center;
           margin-bottom: 15px;
           background: rgba(156, 163, 175, 0.1);
           padding: 10px 20px;
           border-radius: 20px;
           border: 2px solid rgba(156, 163, 175, 0.3);
         }
        
                 .spin-wheel {
           position: relative;
           width: 298px;
           height: 298px;
           border-radius: 50%;
           margin-bottom: 20px;
           margin-top: 10px;
           box-shadow: 
             0 0 0 4px rgba(156, 163, 175, 0.4),
             0 0 40px rgba(156, 163, 175, 0.6),
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
             #9CA3AF 0deg 30deg, #2a2a2a 30deg 60deg,
             #9CA3AF 60deg 90deg, #2a2a2a 90deg 120deg,
             #9CA3AF 120deg 150deg, #2a2a2a 150deg 180deg,
             #9CA3AF 180deg 210deg, #2a2a2a 210deg 240deg,
             #9CA3AF 240deg 270deg, #2a2a2a 270deg 300deg,
             #9CA3AF 300deg 330deg, #2a2a2a 330deg 360deg
           );
           transition: transform 0.3s ease;
           box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
         }
         
         /* Faster initial speed then smooth deceleration */
         .wheel-segments.spinning {
           transition: transform 3.8s cubic-bezier(0.12, 0.85, 0.33, 1);
         }
        
        .wheel-pointer {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 21px solid #9CA3AF;
          z-index: 10;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6));
        }
        
        .wheel-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 85px;
          height: 85px;
          background: linear-gradient(145deg, #F3F4F6, #9CA3AF);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #1a1a1a;
          z-index: 5;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-weight: normal;
          font-size: 12px; 
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
           font: normal 13px 'Impact', 'Arial Black', sans-serif;
           text-align: center;
           white-space: nowrap;
           text-shadow: 0 2px 4px rgba(0,0,0,0.8);
           transform-origin: center center;
           user-select: none;
           pointer-events: none;
         }
        
        .spin-button {
          background: linear-gradient(145deg, #9CA3AF, #F3F4F6);
          color: #1a1a1a;
          border: none;
          padding: 15px 35px;
          font-size: 18px;
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(156, 163, 175, 0.4);
          margin-top: 25px; /* added spacing above spin button */
          margin-bottom: 20px;
          white-space: nowrap;
        }
        
        @media (max-width: 480px) {
          .spin-button {
            font-size: 14px;
            padding: 12px 18px;
            letter-spacing: 0.8px;
          }
        }
        
        .spin-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(156, 163, 175, 0.6);
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
           color: #F3F4F6;
           border: 2px solid #9CA3AF;
           padding: 10px 25px;
           font-size: 14px;
           font-weight: normal;
           font-family: 'Impact', 'Arial Black', sans-serif;
           border-radius: 25px;
           cursor: pointer;
           transition: all 0.3s ease;
         }
         
         .close-wheel:hover {
           background: #9CA3AF;
           color: #1a1a1a;
         }
         
         .wheel-close-x {
           position: absolute;
           top: 20px;
           right: 20px;
           width: 40px;
           height: 40px;
           background: rgba(156, 163, 175, 0.8);
           border: 2px solid #F3F4F6;
           border-radius: 50%;
           color: #1a1a1a;
           font-size: 20px;
           font-weight: normal;
           cursor: pointer;
           display: flex;
           align-items: center;
           justify-content: center;
           z-index: 10002;
           transition: all 0.3s ease;
         }
         
         .wheel-close-x:hover {
           background: #F3F4F6;
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
          border: 3px solid #9CA3AF;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.8);
        }
        
        .result-title {
          color: #F3F4F6;
          font-size: 24px;
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          margin-bottom: 20px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .result-prize {
          background: linear-gradient(145deg, #9CA3AF, #F3F4F6);
          color: #1a1a1a;
          font-size: 28px;
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
          box-shadow: 0 8px 20px rgba(156, 163, 175, 0.4);
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
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          text-align: center;
          border: none;
        }
        
        .result-btn.primary {
          background: linear-gradient(145deg, #9CA3AF, #F3F4F6);
          color: #1a1a1a;
          box-shadow: 0 4px 15px rgba(156, 163, 175, 0.4);
        }
        
        .result-btn.secondary {
          background: #25D366;
          color: white;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        }
        
        .result-btn:hover {
          transform: translateY(-2px);
        }

        /* Control Panel (dropdown under wheel) */
        .wheel-control-panel {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease;
          width: 288px;
          max-width: 90%;
          margin: 10px auto 0; /* center under wheel */
          background: linear-gradient(145deg, #1a1a1a, #222);
          border: 1px solid rgba(156, 163, 175, 0.4);
          border-radius: 12px;
          padding: 13px 18px;
        }

        .wheel-control-panel.open {
          max-height: 306px; /* reduced by 10% for more compact form */
          opacity: 1;
        }

        .wheel-control-panel .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
        }

        /* Phone row layout */
        .wheel-control-panel .phone-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 10px; /* reduced spacing by 10% */
        }

        .wheel-control-panel .phone-row input:first-child {
          max-width: 72px; /* reduced by 10% */
          text-align: center;
          cursor: not-allowed;
        }

        .wheel-control-panel .phone-row input:last-child {
          flex: 1;
        }

        /* Ensure all input boxes take full width inside their container and keep consistent styling */
        .wheel-control-panel input {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 10px;
          border-radius: 6px;
          border: 1px solid #666;
          background: #222;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-weight: normal;
          font-size: 13px;
        }

        .wheel-control-panel label {
          color: #F3F4F6;
          font-size: 13px;
          margin-bottom: 3px;
          font-family: 'Montserrat', sans-serif;
          font-weight: normal;
          text-align: left;
        }

        .wheel-control-panel .panel-message {
          color: #9CA3AF;
          font-size: 13px;
          min-height: 16px;
          font-family: 'Montserrat', sans-serif;
          font-weight: normal;
          text-align: center;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .wheel-control-panel .panel-message {
            font-size: 12px;
          }
        }

        /* Action buttons inside control panel after prize */
        .wheel-control-panel .panel-actions {
          display: flex;
          justify-content: center;
          margin-top: 13px;
          margin-bottom: 9px; /* reduced spacing by 10% */
        }
        
        @keyframes wheelGlow {
          0% { box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.4), 0 0 40px rgba(156, 163, 175, 0.6), 0 15px 50px rgba(0, 0, 0, 0.5); }
          100% { box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.7), 0 0 60px rgba(156, 163, 175, 0.9), 0 15px 50px rgba(0, 0, 0, 0.5); }
        }
        
        @media (max-width: 480px) {
          .wheel-control-panel input {
            font-size: 16px; /* Prevent iOS Safari zoom */
          }
          .wheel-control-panel .panel-message {
            white-space: normal; /* allow wrapping on small screens */
            line-height: 1.3;
          }
          .spin-wheel { width: 204px; height: 204px; }
          .spin-wheel {
            overflow: hidden; /* prevent square artifacts behind circular wheel */
            border-radius: 50%;
            clip-path: circle(50% at 50% 50%);
            border: 4px solid rgba(156,163,175,0.7); /* visible silver border */
            box-shadow: 0 0 20px rgba(156,163,175,0.6);
          }
          .wheel-center { width: 68px; height: 68px; font-size: 10px; }
          .wheel-title { font-size: 18px; }
          .wheel-label span { font-size: 9px; }
          .wheel-title { margin-top: 10px; }

          /* Ensure entire modal fits and is scrollable if needed */
          .wheel-modal {
            justify-content: flex-start;
            padding-top: 10px;
            overflow-y: auto;
          }

          /* Slightly smaller wheel to free up space */
          .spin-wheel { width: 204px; height: 204px; }
          .wheel-control-panel { margin-top: 8px; }
          .spin-button { margin-top: 8px; margin-bottom: 15px; }
          .close-wheel { margin-top: 10px; }
           }
        
        @media (min-width: 768px) {
          .wheel-control-panel .panel-message {
            font-size: 16px;
            white-space: normal; /* allow wrapping on larger screens */
          }

          .wheel-control-panel {
            width: 378px;
          }
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
         <h2 class="wheel-title">SPIN TO WIN A GIFT CARD TOWARDS<br>YOUR NEXT MERCEDES-BENZ SERVICE!</h2>
         <div class="spin-counter">Spin ${currentSpin} of ${maxSpins}${currentSpin === maxSpins ? ' - FINAL SPIN!' : ''}</div>
         <div class="spin-wheel">
           <div class="wheel-segments"></div>
           <div class="wheel-pointer"></div>
           <div class="wheel-center">Spin<br>to<br>Win</div>
         </div>

         <!-- Control panel dropdown -->
         <div class="wheel-control-panel">
           <div class="input-group">
             <label for="wheelUserName">Name</label>
             <input type="text" id="wheelUserName" placeholder="Your Name" />
           </div>
           <div class="input-group">
             <label>WhatsApp Number</label>
             <div class="phone-row">
               <input type="text" id="wheelUserCountryCode" value="+971" readonly />
               <input type="tel" id="wheelUserPhone" placeholder="5xxxxxxx" />
             </div>
           </div>
           <div class="panel-message" id="panelMessage"></div>
         </div>
         <button class="spin-button">${currentSpin === maxSpins ? 'FINAL SPIN' : 'Spin the Wheel'}</button>
         <button class="close-wheel">Close</button>
       `;
      
                    // Add prize labels that rotate with the wheel segments
       const wheel = modal.querySelector('.spin-wheel');
       const segments = modal.querySelector('.wheel-segments');
       const prizes = [1000, 50, 900, 100, 800, 200, 700, 250, 600, 300, 500, 400];
       const isMobile = window.innerWidth <= 480;
       const textRadius = isMobile ? 68 : 102; // Slightly closer to edge on mobile
       const prizeFontSize = isMobile ? 9 : 11;
       
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
                    span.style.font = `normal ${prizeFontSize}px \"Impact\", \"Arial Black\", sans-serif`;
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
      // Begin a slow, continuous idle spin so the wheel is always moving until the user initiates a real spin
      let idleRotation = 0;
      const idleSpeed = 0.2; // degrees per tick (adjust for slower/faster idle spin)
      modal.idleRotation = idleRotation;
      modal.idleInterval = setInterval(() => {
        idleRotation = (idleRotation + idleSpeed) % 360;
        segments.style.transform = `rotate(${idleRotation}deg)`;
        modal.idleRotation = idleRotation;
      }, 50);
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
      
             // Disabled background click-to-close to avoid accidental modal dismissal
       // modal.addEventListener('click', (e) => {
       //   if (e.target === modal) {
       //     closeWheel(modal);
       //   }
       // });
      
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
           spinButton.disabled = true;
           spinButton.style.opacity = '0.5';
           spinButton.style.cursor = 'not-allowed';
         }
     }
     
     // Close wheel modal
     function closeWheel(modal) {
       if (!isWheelOpen) return;
       if (modal.idleInterval) {
        clearInterval(modal.idleInterval);
        modal.idleInterval = null;
      }
       isWheelOpen = false;
       currentSpin = 0; // Reset spin counter for next time
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
     async function spinWheel(modal) {
       // Block further spins if already claimed
       if (modal.claimed) return;

       // If there is an unclaimed pending prize, spinning again forfeits it
       if (modal.pendingPrize) {
         const actionContainer = modal.querySelector('.panel-actions');
         if (actionContainer) actionContainer.remove();
         modal.pendingPrize = null;
         const panelMessageEl = modal.querySelector('#panelMessage');
         if (panelMessageEl) panelMessageEl.textContent = 'Previous prize forfeited. Spinning again...';
       }

       // ------------------ VALIDATE DETAILS FIRST ------------------
       const controlPanel = modal.querySelector('.wheel-control-panel');
       const nameInput = modal.querySelector('#wheelUserName');
       const phoneInput = modal.querySelector('#wheelUserPhone');
       const countryCodeInput = modal.querySelector('#wheelUserCountryCode');
       const panelMsg = modal.querySelector('#panelMessage');

       if (!modal.detailsCollected) {
         // Ensure panel is visible
         if (controlPanel && !controlPanel.classList.contains('open')) {
           controlPanel.classList.add('open');
         }

         if (!nameInput.value.trim() || !phoneInput.value.trim()) {
           if (panelMsg) panelMsg.textContent = 'Please enter your name and WhatsApp number to spin!';
           return; // Do not spin until details are provided
         }

         // Basic phone validation (country code is fixed +971; ensure digits only for number)
         if (!/^\d{7,15}$/.test(phoneInput.value.trim())) {
           if (panelMsg) panelMsg.textContent = 'Enter a valid UAE WhatsApp number (digits only).';
           return;
         }
         modal.userPhoneFull = `${countryCodeInput.value}${phoneInput.value.trim()}`;
         modal.userName      = nameInput.value.trim();

         /* ---------------- Duplicate check via Supabase ---------------- */
         await loadSupabase();
         const { data: existing } = await supabase
           .from('wheel_entries')
           .select('id')
           .eq('mobile', modal.userPhoneFull)
           .maybeSingle();

         if (existing) {
           if (panelMsg) panelMsg.textContent = 'Thank you for playing, you have already won!';
           return; // Block spin
         }

         modal.detailsCollected = true;
         if (panelMsg) panelMsg.textContent = '';
       }

       if (isSpinning || currentSpin >= maxSpins || allSpinsComplete) return;

       // Increment spin counter as spin begins
       currentSpin++;
       updateSpinDisplay(modal);
       
       isSpinning = true;
       const spinButton = modal.querySelector('.spin-button');
       const segments = modal.querySelector('.wheel-segments');

      // Stop idle spin and capture current rotation if it is running
      if (modal.idleInterval) {
        clearInterval(modal.idleInterval);
        modal.idleInterval = null;
      }
      // Use cumulative rotation to ensure noticeable movement each spin
      const cumulativeRotation = modal.cumulativeRotation || 0;
       
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
       // Add slight random offset (±10°) to avoid stopping exactly at center
       const randomOffset = (Math.random() * 20) - 10; // -10 to +10
       const offsetClamped = Math.max(Math.min(randomOffset, (segmentAngle/2 - 2)), (-segmentAngle/2 + 2));
       const targetSegmentPoint = targetSegmentCenter + offsetClamped;
       const targetFinalPosition = 360 - targetSegmentCenter; // For debug/logging purposes
       
       // PRECISE FIX: Calculate exact rotation for target segment
       const baseRotations = Math.floor(6 + Math.random() * 3); // 6-8 full rotations for realism
       const currentRotationMod = cumulativeRotation % 360;
       const clockwiseToTarget = (360 - targetSegmentPoint - currentRotationMod + 360) % 360;
       const spinDegrees = (baseRotations * 360) + clockwiseToTarget;
       const totalRotation = cumulativeRotation + spinDegrees;

       // Store for next spin
       modal.cumulativeRotation = totalRotation;

       // Apply the rotation with proper easing
       segments.style.transform = `rotate(${totalRotation}deg)`;
       
                // Debug verification - 5-spin system
       console.log(`🎯 5-SPIN SYSTEM DEBUG:`);
       console.log(`🎯 Current spin: ${currentSpin} of ${maxSpins}`);
       console.log(`🎯 Targeting: ${targetPrize} AED at index ${targetPrizeIndex}`);
       console.log(`🎯 Target segment: ${targetPrizeIndex * 30}° to ${(targetPrizeIndex + 1) * 30}°`);
       console.log(`🎯 Target point (with offset): ${targetSegmentPoint}°`);
       console.log(`🎯 Target final position: ${targetFinalPosition}°`);
       console.log(`🎯 Total rotation: ${totalRotation}°`);
       console.log(`🎯 Final position: ${totalRotation % 360}°`);
       
                // Show result after spin completes
          setTimeout(() => {
           segments.classList.remove('spinning');
           isSpinning = false;

           // No increment here; already done at spin start
           // Disable wheel completely after 5th spin
           if (currentSpin >= maxSpins) {
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
             showResult(selectedPrize, modal, targetPrizeIndex);
           }, 1000);
         }, 4000);

        // Update control panel with immediate status (optimistic)
        if (panelMsg) {
          panelMsg.textContent = 'Spinning... good luck!';
        }
    }
    
         // Show result popup with claim/continue options
     async function showResult(prize, wheelModal, prizeId) {
       const isLastSpin = currentSpin >= maxSpins;

       // Hide the input fields after prize is won
       const inputGroups = wheelModal.querySelectorAll('.wheel-control-panel .input-group');
       inputGroups.forEach(el => el.style.display = 'none');

       // Save current prize on modal for later use
       wheelModal.currentPrize = prize;

       // Update panel message
       const panelMessageEl = wheelModal.querySelector('#panelMessage');
       if (panelMessageEl) {
         panelMessageEl.innerHTML = `<strong>Congratulations!</strong> You won an AED ${prize} Gift Card! ${isLastSpin ? '' : `${maxSpins - currentSpin} spins left.`}`;
         panelMessageEl.style.color = '#F3F4F6';
       }

       // Launch confetti on every prize reveal
       console.log('🎉 Attempting confetti');
       loadConfetti().then(() => {
         console.log('🎉 Confetti library ready:', typeof window.confetti);
         window.confetti({
           particleCount: 180,
           spread: 80,
           startVelocity: 45,
           origin: { y: 0.6 }
         });

         // Ensure confetti canvas sits above modal
         setTimeout(() => {
           document.querySelectorAll('canvas').forEach((cv) => {
             if (!cv.dataset.confettiAdjusted) {
               cv.style.zIndex = '10050';
               cv.dataset.confettiAdjusted = '1';
             }
           });
         }, 50);
       });

       // Add claim buttons once
       let actions = wheelModal.querySelector('.wheel-control-panel .panel-actions');
       if (!actions) {
         actions = document.createElement('div');
         actions.className = 'panel-actions';
         actions.innerHTML = `
           <a href="#" id="claimPrizeBtn" class="result-btn primary" style="text-align:center; min-width:120px; font-size:13px; padding:10px 18px;">Claim Prize</a>
         `;
         panelMessageEl.parentNode.appendChild(actions);

         // Placeholder click handler (to be replaced by webhook later)
         const spinButtonGlobal = wheelModal.querySelector('.spin-button');
         const claimBtn = actions.querySelector('#claimPrizeBtn');
         if (claimBtn) {
           claimBtn.addEventListener('click', async (e) => {
             e.preventDefault();
             claimBtn.textContent = 'Claimed';
             claimBtn.disabled = true;
             panelMessageEl.textContent = 'Please check your WhatsApp for confirmation.';
             if (spinButtonGlobal) {
               spinButtonGlobal.disabled = true;
               spinButtonGlobal.textContent = 'Spins Disabled';
             }
             // Mark modal as claimed to prevent future spins
             wheelModal.claimed = true;
             wheelModal.pendingPrize = null;

             /* ---------------- Webhook conversion ping ---------------- */
             try {
               const payload = {
                 data: {
                   name: wheelModal.userName || '',
                   mobile: wheelModal.userPhoneFull || '',
                   prize: `${wheelModal.currentPrize} AED GIFT CARD`
                 }
               };
               await fetch('https://bothook.io/v1/public/triggers/webhooks/ad29e7ad-96a8-4710-83cc-6c2a3ec49564', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify(payload)
               });
             } catch (err) {
               console.error('Webhook failed', err);
             }

             // Record entry only once (ensure supabase is loaded)
             if (!wheelModal.entryRecorded) {
               await loadSupabase();
               await supabase.from('wheel_entries').insert({
                 name:          wheelModal.userName,
                 mobile:        wheelModal.userPhoneFull,
                 selected_prize: String(prize),
                 prize_id:       prizeId
               });
               wheelModal.entryRecorded = true;
             }
           });
         }
       }

       // Update spin button text/state
       const spinButton = wheelModal.querySelector('.spin-button');
       if (spinButton) {
         if (isLastSpin) {
           spinButton.textContent = 'Claim Prize';
           spinButton.disabled = true; // final spin complete
         } else {
           spinButton.textContent = `Forfeit Prize & Try Again (${maxSpins - currentSpin} left)`;
           spinButton.disabled = false;
         }
       }
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

  // Live Status for Working Hours
  function updateWorkingHoursStatus() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const hoursItems = document.querySelectorAll('.hours-item');
    
    hoursItems.forEach((item, index) => {
      // Remove existing status classes
      item.classList.remove('current-day');
      
      // Determine which day this item represents
      // Index 0 = Monday-Saturday, Index 1 = Sunday
      const isWeekday = index === 0;
      const isSunday = index === 1;
      
      // Check if it's the current day period
      const isCurrentDayPeriod = (isWeekday && currentDay >= 1 && currentDay <= 6) || 
                                 (isSunday && currentDay === 0);
      
      if (isCurrentDayPeriod) {
        item.classList.add('current-day');
      }
    });
  }
  
  // Initialize working hours status
  updateWorkingHoursStatus();
  setInterval(updateWorkingHoursStatus, 60000); // Update every minute
}); 

// Trigger the init functions immediately if the DOM was already loaded before this script executed
if (document.readyState !== 'loading') {
  document.dispatchEvent(new Event('DOMContentLoaded'));
}

// Additional window load event for services initialization fallback
window.addEventListener('load', () => {
  // Final attempt to initialize services if they haven't been initialized yet
  setTimeout(() => {
    const servicesNav = document.querySelector('.services-nav ul');
    if (servicesNav && servicesNav.children.length === 0) {
      console.log('🔄 Window load fallback: attempting services init');
      initializeServicesNavigation();
    }
  }, 300);
}); 