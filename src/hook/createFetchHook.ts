import {useEffect} from "react";
import {useAppContext} from "../app/AppContext";
import {httpGet} from "../server/httpGet";
import {IEvents} from "../utils/interface";

/**
 * Create fetch hook which contains that common boilerplate shit.
 *
 * @param link Link id from the Discovery Index; must exists or an error will be thrown.
 * @param replace Which part of the url will be replaced by later UUID parameter (by default **{id}**)
 */
export function createFetchHook(link: string, replace: string = "{id}") {
	return (
		uuid: string,
		events: IEvents,
	) => {
		const appContext = useAppContext();
		useEffect(() => {
			events.call("request", uuid);
			const cancelToken = httpGet(
				appContext.link(link, {[replace]: uuid}),
				events,
			);
			return () => cancelToken.cancel();
		}, [uuid]);
	};
}
