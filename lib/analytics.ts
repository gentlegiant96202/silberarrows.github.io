// Google Analytics & Ads Event Tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

// Helper function to send events to Google Analytics
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Conversion Events for Mercedes Service Business
export const trackConversion = {
  // Phone Call Clicked
  phoneCall: () => {
    gtag('event', 'phone_call', {
      event_category: 'contact',
      event_label: 'phone_click',
      value: 1
    });
    
    // Google Ads Conversion
    gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/phone-call`,
      value: 50.0,
      currency: 'AED'
    });
  },

  // WhatsApp Clicked  
  whatsappClick: () => {
    gtag('event', 'whatsapp_click', {
      event_category: 'contact',
      event_label: 'whatsapp_click',
      value: 1
    });

    gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/whatsapp-contact`,
      value: 30.0,
      currency: 'AED'
    });
  },

  // Contact Form Submitted
  contactForm: (formType: string) => {
    gtag('event', 'form_submit', {
      event_category: 'contact',
      event_label: formType,
      value: 1
    });

    gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/contact-form`,
      value: 75.0,
      currency: 'AED'
    });
  },

  // Service Page Viewed
  serviceView: (serviceName: string) => {
    gtag('event', 'page_view', {
      event_category: 'service',
      event_label: serviceName,
      page_title: `${serviceName} - Mercedes Service Dubai`
    });
  },

  // Service Quote Requested
  quoteRequest: (serviceType: string) => {
    gtag('event', 'quote_request', {
      event_category: 'lead',
      event_label: serviceType,
      value: 1
    });

    gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/quote-request`,
      value: 100.0,
      currency: 'AED'
    });
  },

  // Spin Wheel Game Played
  spinWheelPlay: () => {
    gtag('event', 'game_play', {
      event_category: 'engagement',
      event_label: 'spin_wheel',
      value: 1
    });
  },

  // Spin Wheel Prize Claimed
  spinWheelClaim: (prizeValue: number) => {
    gtag('event', 'prize_claim', {
      event_category: 'conversion',
      event_label: 'spin_wheel_prize',
      value: prizeValue
    });

    gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/prize-claim`,
      value: prizeValue,
      currency: 'AED'
    });
  }
};

// Page View Tracking
export const trackPageView = (url: string, title: string) => {
  gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_location: url,
    page_title: title
  });
};

// Enhanced E-commerce for Service Contracts
export const trackServiceContract = (contractType: string, value: number) => {
  gtag('event', 'purchase', {
    transaction_id: `contract_${Date.now()}`,
    value: value,
    currency: 'AED',
    items: [{
      item_id: contractType,
      item_name: `Mercedes Service Contract - ${contractType}`,
      category: 'service_contract',
      quantity: 1,
      price: value
    }]
  });
}; 