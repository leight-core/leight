import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../interface/interface";
import {httpPut} from "./httpPut";
import {IPutCallback} from "./interface";
import {ServerEvents} from "./ServerEvents";

/**
 * Simple factory for creating `put` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPut<TRequest = any, TResponse = any>(link: string): IPutCallback<TRequest, TResponse> {
	return (
		request: TRequest,
		discoveryContext: IDiscoveryContext,
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpPut<TRequest, TResponse>(
		discoveryContext.link(link, params),
		request,
		config,
	);
}

export function createUsePut<TRequest = any, TResponse = any>(link: string, deps: DependencyList = []) {
	return (request: TRequest, params?: IParams, config?: AxiosRequestConfig) => {
		const events = ServerEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpPut<TRequest, TResponse>(discoveryContext.link(link, params), request, config).chain(events).cleaner(), deps);
		return events;
	};
}
