import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {httpPatch} from "./httpPatch";
import {IPatchCallback, IServerEvents} from "./interface";

/**
 * Simple factory for creating `patch` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPatch<TRequest = any, TResponse = any>(link: string): IPatchCallback<TRequest, TResponse> {
	return (
		data: TRequest,
		appContext: IAppContext,
		events: IServerEvents<TResponse>,
		params?: Params,
	) => httpPatch<TRequest>(
		appContext.link(link, params),
		data,
		events,
	);
}
