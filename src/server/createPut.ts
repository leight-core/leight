import {Params} from "react-router";
import {IDiscoveryContext} from "../discovery/interface";
import {httpPut} from "./httpPut";
import {IPutCallback} from "./interface";

/**
 * Simple factory for creating `put` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPut<TRequest = any, TResponse = any>(link: string): IPutCallback<TRequest, TResponse> {
	return (
		data: TRequest,
		discoveryContext: IDiscoveryContext,
		params?: Params,
	) => httpPut<TRequest, TResponse>(
		discoveryContext.link(link, params),
		data,
	);
}
