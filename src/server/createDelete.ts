import {AxiosRequestConfig} from "axios";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../interface/interface";
import {httpDelete} from "./httpDelete";
import {IDeleteCallback} from "./interface";

/**
 * Simple factory for creating `delete` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createDelete<TResponse = any>(link: string): IDeleteCallback<TResponse> {
	return (
		discoveryContext: IDiscoveryContext,
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpDelete<TResponse>(
		discoveryContext.link(link, params),
		config,
	);
}
