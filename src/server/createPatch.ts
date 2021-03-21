import {AxiosRequestConfig} from "axios";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../interface/interface";
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
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpPatch<TRequest, TResponse>(
		discoveryContext.link(link, params),
		data,
		config,
	);
}
