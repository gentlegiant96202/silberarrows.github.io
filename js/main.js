// Smoothly adjust hero content padding to account for fixed header height
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavContainer = document.querySelector('.mobile-nav-container');
  const body = document.body;

  if (!header || !hero) {
    return;
  }

  const setHeroPadding = () => {
    const headerHeight = header.offsetHeight;
    // Small gap between header and hero content
    hero.style.paddingTop = `${headerHeight - 10}px`;
  };

  // Set padding on initial load
  setHeroPadding();

  // Adjust padding on window resize
  window.addEventListener('resize', setHeroPadding);

  // Handle hero quote button
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
}); 