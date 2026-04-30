declare global {
	interface Window {
		flowtag: {
			fetchBeacon: () => void;
			consentCookies: (consent: boolean) => void;
			getConsent: () => boolean;
			capture: (eventName: string, eventData?: Record<string, any>) => void;
		};
	}
}

export {};
