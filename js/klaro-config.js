window.klaroConfig = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'cookie',
  cookieName: 'klaro-consent',
  cookieExpiresAfterDays: 365,
  privacyPolicy: 'about.html#privacy-policy',
  default: true,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  translations: {
    en: {
      consentModal: {
        title: 'Consent Settings',
        description: 'Customize which cookies and data collection tracking you want to allow for this demo site.',
      },
      consentNotice: {
        changeDescription: 'Consent settings have been updated since your last visit.',
        description: 'This demo site uses cookies to test Google Tag Gateway and Google Consent Mode v2 (Advanced Consent Mode). Please choose your preferences.',
        learnMore: 'Customize',
        acceptAll: 'Accept All',
        declineAll: 'Decline All',
      },
      purposes: {
        analytics: 'Measurement & Analytics',
        marketing: 'Advertising & Personalization',
      },
      services: {
        'google-analytics': {
          description: 'Enables analytics tracking to analyze site traffic, page views, and user journeys. Maps to "analytics_storage" consent.'
        },
        'google-ads': {
          description: 'Enables personalized advertising and attribution. Maps to "ad_storage", "ad_user_data", and "ad_personalization" consent.'
        }
      }
    }
  },
  services: [
    {
      name: 'google-analytics',
      title: 'Google Analytics',
      purposes: ['analytics'],
      cookies: [
        /^_ga(_.*)?/
      ],
      onAccept: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        }
      },
      onDecline: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            'analytics_storage': 'denied'
          });
        }
      }
    },
    {
      name: 'google-ads',
      title: 'Google Ads & Personalization',
      purposes: ['marketing'],
      onAccept: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
          });
        }
      },
      onDecline: function() {
        if (typeof gtag === 'function') {
          gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
        }
      }
    }
  ]
};
