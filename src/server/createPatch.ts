import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpPatch} from "./httpPatch";
import {IPatchCallback, IServerEvents} from "./interface";

/**
 * Simple factory for creating `patch` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPatch<TRequest = any>(link: string): IPatchCallback<IServerEvents, TRequest> {
	return (
		data: TRequest,
		appContext: IAppContext,
		events: IEvents<IServerEvents>,
		params?: Params,
	) => httpPatch<TRequest>(
		appContext.link(link, params),
		data,
		events,
	);
}
