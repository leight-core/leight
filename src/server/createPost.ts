import {AxiosRequestConfig} from "axios";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../interface/interface";
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
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpPost<TRequest, TResponse>(
		discoveryContext.link(link, params),
		data,
		config,
	);
}
