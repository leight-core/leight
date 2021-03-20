import {Params} from "react-router";
import {IDiscoveryContext} from "../discovery/interface";
import {httpPatch} from "./httpPatch";
import {IPatchCallback} from "./interface";

/**
 * Simple factory for creating `patch` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPatch<TRequest = any, TResponse = any>(link: string): IPatchCallback<TRequest, TResponse> {
	return (
		data: TRequest,
		discoveryContext: IDiscoveryContext,
		params?: Params,
	) => httpPatch<TRequest, TResponse>(
		discoveryContext.link(link, params),
		data,
	);
}
