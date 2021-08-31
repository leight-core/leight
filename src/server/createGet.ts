import {httpGet, IDiscoveryContext, IGetCallback, IParams, ServerEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";

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
