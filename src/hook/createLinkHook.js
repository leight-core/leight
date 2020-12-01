import {useEffect} from "react";
import {useAppContext} from "../app/AppContext";
import httpGet from "../server/httpGet";

/**
 * @typedef {function} LinkHookType
 * @param {EventsInstanceType} events See {@link EventsInstanceType}
 */

/**
 * Create simple hook using effect under the hood.
 *
 * @param {string} link
 *
 * @return {LinkHookType}
 */
const createLinkHook = link => {
	return (
		events,
	) => {
		const appContext = useAppContext();
		useEffect(() => {
			events.call("request");
			const cancelToken = httpGet(
				appContext.link(link),
				events,
			);
			return () => cancelToken.cancel();
		}, []);
	};
};

export default createLinkHook;
