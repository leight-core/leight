import {IAppContext} from "../app/AppContext";
import {IEvents} from "../utils/Events";
import {httpPost} from "./httpPost";

/**
 * Simple factory for creating post based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TData>(link: string) {
	return (
		data: TData,
		appContext: IAppContext,
		events: IEvents,
	) => httpPost(
		appContext.link(link),
		data,
		events,
	);
}
