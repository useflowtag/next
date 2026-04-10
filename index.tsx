import Script from "next/script";
import { useId } from "react";

interface FlowtagProps {
	trackerId: string;
	endpoint?: string;
	silent?: boolean;
	syncWithGoogleTag?: boolean;
	beaconStrategy?: "immediate" | "after_consent" | "manual";
}

/**
 * Flowtag component to add tracker in Next.js applications
 * 
 * Example implementation:
 * ```
 * <Flowtag trackerId="your-tracker-id" silent={true} syncWithGoogleTag={true} beaconStrategy="after_consent" />
 * ```
 *
 * @param props - Props for Flowtag component
 * @returns 
 */
function Flowtag(props: FlowtagProps) {
	const {
		trackerId,
		endpoint = "https://flowtagbeacon.qwerty.ovh/",
		silent = false,
		syncWithGoogleTag = true,
		beaconStrategy = "manual",
	} = props;
	const id = useId();
	const normalizedEndpoint = new URL(endpoint).toString();

	return (
		<Script
			id={`__flowtag_next_${id}`}
			src={new URL("tag.js", normalizedEndpoint).toString()}
			async
			defer
			data-ftag={trackerId}
			data-endpoint={normalizedEndpoint}
			data-silent={silent}
			data-gtagsync={syncWithGoogleTag}
			data-beacon-strategy={beaconStrategy}
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

const F = { fetchBeacon, consentCookies, getConsent };

export default Flowtag;
export type { FlowtagProps };
export { Flowtag, F };
