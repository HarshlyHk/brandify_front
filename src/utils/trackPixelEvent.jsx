export const trackPixelEvent = (eventName, params = {}) => {
     if (window.fbq) {
       window.fbq('track', eventName, params);
     }
   };
   