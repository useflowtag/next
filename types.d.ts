declare global {
  interface Window {
    flowtag: { fetchBeacon: () => void, consentCookies: (consent: boolean) => void, getConsent: () => boolean };
  }
}

export {};