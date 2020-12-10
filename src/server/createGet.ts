import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpGet} from "./httpGet";

/**
 * Simple factory for creating get based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createGet(link: string) {
	return (
		appContext: IAppContext,
		events: IEvents,
	) => httpGet(
		appContext.link(link),
		events,
	);
}
