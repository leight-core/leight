import { useEffect } from "react";
import { useDiscoveryContext } from "../discovery/DiscoveryContext";
import Server from "../server/Server";

/**
 * Create fetch hook which contains that common boilerplate shit.
 *
 * @param {string} link Link id from the Discovery Index; must exists or an error will be thrown.
 * @param {string} [replace={id}] Which part of the url will be replaced by later UUID parameter (by default {id})
 *
 * @return {function(string, EventsInstanceType): void}
 */
const createFetchHook = (link, replace = "{id}") => {
	return (
		uuid,
		events,
	) => {
		const discoveryContext = useDiscoveryContext();
		useEffect(() => {
			events.call("request", uuid);
			const cancelToken = Server.httpGet(
				discoveryContext.fetch(link, uuid, replace),
				events,
			);
			return () => cancelToken.cancel();
			// eslint-disable-next-line
		}, [uuid]);
	};
};

export default createFetchHook;
