import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {httpPost} from "./httpPost";
import {IPostCallback, IServerEvents} from "./interface";

/**
 * Simple factory for creating `post` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TRequest = any, TResponse = any>(link: string): IPostCallback<TRequest, TResponse> {
	return (
		data: TRequest,
		appContext: IAppContext,
		events: IServerEvents<TResponse>,
		params?: Params,
	) => httpPost<TRequest, TResponse>(
		appContext.link(link, params),
		data,
		events,
	);
}
