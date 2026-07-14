// Function to update the UI debug panel
function updateConsentUIDisplay() {
  const types = ['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'];
  types.forEach(type => {
    const el = document.getElementById(`status-${type}`);
    if (!el) return;
    
    let status = 'denied'; // fallback default
    
    // Check google_tag_data if it exists
    if (window.google_tag_data && window.google_tag_data.ics && typeof window.google_tag_data.ics.getConsentState === 'function') {
      const state = window.google_tag_data.ics.getConsentState(type);
      if (state === 1) {
        status = 'granted';
      } else if (state === 0) {
        status = 'denied';
      }
    } else {
      // Fallback: parse dataLayer history
      let lastState = 'denied';
      if (window.dataLayer) {
        for (let i = 0; i < window.dataLayer.length; i++) {
          const item = window.dataLayer[i];
          if (item && item[0] === 'consent' && (item[1] === 'default' || item[1] === 'update')) {
            const consentObj = item[2];
            if (consentObj && consentObj[type] !== undefined) {
              lastState = consentObj[type];
            }
          } else if (item && item.event === 'gtm.init_consent') {
             // Handle some specific GTM consent init cases if needed
          }
        }
      }
      status = lastState;
    }

    el.innerText = status.toUpperCase();
    el.className = `status-badge status-${status.toLowerCase()}`;
  });

}

// Intercept dataLayer.push to keep display updated
(function() {
  window.dataLayer = window.dataLayer || [];
  const originalPush = window.dataLayer.push;
  window.dataLayer.push = function() {
    const result = originalPush.apply(this, arguments);
    // Use setTimeout to allow the GTM/tag processing to complete first
    setTimeout(updateConsentUIDisplay, 50);
    return result;
  };
})();

// Initialize on load and repeat a few times to capture post-load updates
window.addEventListener('DOMContentLoaded', () => {
  updateConsentUIDisplay();
  setTimeout(updateConsentUIDisplay, 100);
  setTimeout(updateConsentUIDisplay, 500);
  setTimeout(updateConsentUIDisplay, 1000);
});

