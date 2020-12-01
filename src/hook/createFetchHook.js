import {useEffect} from "react";
import {useAppContext} from "../app/AppContext";
import httpGet from "../server/httpGet";

/**
 * @typedef {function} FetchHookType
 * @param {string} uuid
 * @param {EventsInstanceType} events See {@link EventsInstanceType}
 */

/**
 * Create fetch hook which contains that common boilerplate shit.
 *
 * @param {string} link Link id from the Discovery Index; must exists or an error will be thrown.
 * @param {string} [replace={id}] Which part of the url will be replaced by later UUID parameter (by default **{id}**)
 *
 * @return {FetchHookType}
 */
const createFetchHook = (link, replace = "{id}") => {
	return (
		uuid,
		events,
	) => {
		const appContext = useAppContext();
		useEffect(() => {
			events.call("request", uuid);
			const cancelToken = httpGet(
				appContext.fetch(link, uuid, replace),
				events,
			);
			return () => cancelToken.cancel();
		}, [uuid]);
	};
};

export default createFetchHook;
