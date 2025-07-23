// Optimized main.js - Essential functionality only (Services now handled by React)
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Main-optimized.js DOMContentLoaded fired');
  
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavContainer = document.querySelector('.mobile-nav-container');

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
  document.addEventListener('click', function(e) {
    if (mobileNavContainer && 
        mobileNavContainer.classList.contains('active') && 
        !mobileNavContainer.contains(e.target) && 
        !mobileNavToggle.contains(e.target)) {
      mobileNavContainer.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
  
  // Hero Quote Button functionality is now handled by React component
  console.log('✅ Hero button handled by React - no JavaScript needed');
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  console.log('✅ Optimized main.js loaded - Services handled by React');
}); 