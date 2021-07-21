import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../link/interface";
import {httpGet} from "./httpGet";
import {IGetCallback} from "./interface";
import {ServerEvents} from "./ServerEvents";

/**
 * Simple factory for creating `get` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createGet<TResponse = any>(link: string): IGetCallback<TResponse> {
	return (
		discoveryContext: IDiscoveryContext,
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpGet<TResponse>(
		discoveryContext.link(link, params),
		config,
	);
}

export function createUseGet<TResponse = any>(link: string, deps: DependencyList = []) {
	return (params?: IParams, config?: AxiosRequestConfig) => {
		const events = ServerEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpGet<TResponse>(discoveryContext.link(link, params), config).chain(events).cleaner(), deps);
		return events;
	};
}
