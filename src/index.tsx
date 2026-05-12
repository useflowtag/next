import Script from "next/script";
import { useId } from "react";
import type { FlowtagConfigOptions } from "./types";

interface FlowtagProps {
	trackerId: string;
	baseUrl?: string;
	debug?: boolean;
	syncWithGoogleTag?: boolean;
	autoInit?: boolean;
}

/**
 * Flowtag component to add tracker in Next.js applications
 *
 * Example implementation:
 * ```
 * <Flowtag trackerId="your-tracker-id" debug={true} syncWithGoogleTag={true} autoInit={true} />
 * ```
 *
 * @param props - Props for Flowtag component
 * @returns
 */
function Flowtag(props: FlowtagProps) {
	const {
		trackerId,
		baseUrl = "https://beacon.flowtagservices.com",
		debug = false,
		autoInit = true,
		syncWithGoogleTag = true,
	} = props;
	const id = useId();
	const normalizedEndpoint = new URL(baseUrl).toString();

	return (
		<Script
			id={`__flowtag_next_${id}`}
			src={new URL("tag.js", normalizedEndpoint).toString()}
			async
			defer
			data-ftag={trackerId}
			data-endpoint={normalizedEndpoint}
			data-debug={debug}
			data-gtagsync={syncWithGoogleTag}
			data-auto-init={autoInit}
		/>
	);
}

// sdk
function fetchBeacon() {
	return window.flowtag.fetchBeacon();
}

function consentCookies(consent: boolean) {
	return window.flowtag.consentCookies(consent);
}

function getConsent(): boolean {
	return window.flowtag.getConsent();
}

function capture(eventName: string, eventData?: Record<string, any>) {
	return window.flowtag.capture(eventName, eventData);
}

function getConfig(): FlowtagConfigOptions;
function getConfig<K extends keyof FlowtagConfigOptions>(
	key: K,
): FlowtagConfigOptions[K];
function getConfig<K extends keyof FlowtagConfigOptions>(
	key?: K,
): FlowtagConfigOptions | FlowtagConfigOptions[K] {
	if (key) {
		return window.flowtag.getConfig(key);
	}
	return window.flowtag.getConfig();
}

function setConfig(
	key: keyof FlowtagConfigOptions,
	value: FlowtagConfigOptions[keyof FlowtagConfigOptions],
) {
	window.flowtag.setConfig(key, value);
}

const flowtag = {
	fetchBeacon,
	consentCookies,
	getConsent,
	capture,
	getConfig,
	setConfig,
};
/**
 * @deprecated Use `flowtag` instead
 */
const F = flowtag;

export default Flowtag;
export type { FlowtagProps };
export { F, Flowtag, flowtag };
