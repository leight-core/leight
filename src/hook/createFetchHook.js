import {useEffect} from "react";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import Server from "../server/Server";

/**
 * @typedef {function} FetchHookType
 * @param {string} uuid
 * @param {EventsInstanceType} events See {@link EventsInstanceType}
 */

/**
 * Create fetch hook which contains that common boilerplate shit.
 *
 * @param {string} link Link id from the Discovery Index; must exists or an error will be thrown.
 * @param {string} [replace={id}] Which part of the url will be replaced by later UUID parameter (by default {id})
 *
 * @return {FetchHookType}
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
		}, [uuid]);
	};
};

export default createFetchHook;
