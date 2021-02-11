import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpDelete} from "./httpDelete";
import {IServerEvents} from "./interface";

/**
 * Simple factory for creating `delete` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createDelete(link: string) {
	return (
		appContext: IAppContext,
		events: IEvents<IServerEvents>,
	) => httpDelete(
		appContext.link(link),
		events,
	);
}
