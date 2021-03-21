import {AxiosRequestConfig} from "axios";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../interface/interface";
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
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpPut<TRequest, TResponse>(
		discoveryContext.link(link, params),
		data,
		config,
	);
}
