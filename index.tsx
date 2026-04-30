import Script from "next/script";
import { useId } from "react";

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
		baseUrl = "https://flowtagbeacon.qwerty.ovh/",
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

const flowtag = { fetchBeacon, consentCookies, getConsent, capture };
/**
 * @deprecated Use `flowtag` instead
 */
const F = flowtag;

export default Flowtag;
export type { FlowtagProps };
export { Flowtag, F, flowtag };
