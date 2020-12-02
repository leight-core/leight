import {useEffect} from "react";
import {useAppContext} from "../app/AppContext";
import {httpGet} from "../server/httpGet";
import {IEvents} from "../utils/Events";

/**
 * Create simple hook using effect under the hood.
 *
 * @param link
 */
export const createLinkHook = (link: string) => {
	return (
		events: IEvents,
		params: Object = null
	) => {
		const appContext = useAppContext();
		useEffect(() => {
			events.call("request");
			const cancelToken = httpGet(
				appContext.link(link, params),
				events,
			);
			return () => cancelToken.cancel();
		}, []);
	};
};
