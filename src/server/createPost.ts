import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpPost} from "./httpPost";

/**
 * Simple factory for creating post based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TRequest = any>(link: string) {
	return (
		data: TRequest,
		appContext: IAppContext,
		events: IEvents,
	) => httpPost<TRequest>(
		appContext.link(link),
		data,
		events,
	);
}
