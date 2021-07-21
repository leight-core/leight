import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../link/interface";
import {httpPost} from "./httpPost";
import {IPostCallback} from "./interface";
import {ServerEvents} from "./ServerEvents";

/**
 * Simple factory for creating `post` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TRequest = any, TResponse = any>(link: string): IPostCallback<TRequest, TResponse> {
	return (
		request: TRequest,
		discoveryContext: IDiscoveryContext,
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpPost<TRequest, TResponse>(
		discoveryContext.link(link, params),
		request,
		config,
	);
}

export function createUsePost<TRequest = any, TResponse = any>(link: string, deps: DependencyList = []) {
	return (request: TRequest, params?: IParams, config?: AxiosRequestConfig) => {
		const events = ServerEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpPost<TRequest, TResponse>(discoveryContext.link(link, params), request, config).chain(events).cleaner(), deps);
		return events;
	};
}
