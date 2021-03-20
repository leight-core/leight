import {Params} from "react-router";
import {IDiscoveryContext} from "../discovery/interface";
import {httpPost} from "./httpPost";
import {IPostCallback} from "./interface";

/**
 * Simple factory for creating `post` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TRequest = any, TResponse = any>(link: string): IPostCallback<TRequest, TResponse> {
	return (
		data: TRequest,
		discoveryContext: IDiscoveryContext,
		params?: Params,
	) => httpPost<TRequest, TResponse>(
		discoveryContext.link(link, params),
		data,
	);
}
