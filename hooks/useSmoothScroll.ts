import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      // Check if it's an anchor link that starts with #
      if (target?.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href');
        const targetElement = targetId ? document.querySelector(targetId) : null;
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listener for smooth scrolling
    document.addEventListener('click', handleSmoothScroll);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);
};

export default useSmoothScroll; 