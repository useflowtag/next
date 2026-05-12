export type FlowtagConfigOptions = {
	debug?: boolean;
	gtagsync?: boolean;
	trackerId: string;
	baseUrl?: string;
	endpoint?: string;
};
declare global {
	interface Window {
		flowtag: {
			fetchBeacon: () => void;
			consentCookies: (consent: boolean) => void;
			getConsent: () => boolean;
			capture: (eventName: string, eventData?: Record<string, any>) => void;
			getConfig(): FlowtagConfigOptions;
			getConfig<K extends keyof FlowtagConfigOptions>(
				key: K,
			): FlowtagConfigOptions[K];
			setConfig<K extends keyof FlowtagConfigOptions>(
				key: K,
				value: FlowtagConfigOptions[K],
			): void;
		};
	}
}
