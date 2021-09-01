import {httpGet, IDiscoveryContext, IGetCallback, IQuery, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
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
		query?: IQuery,
		config?: AxiosRequestConfig,
	) => httpGet<TResponse>(
		discoveryContext.link(link, query),
		config,
	);
}

export function createUseGet<TResponse = any>(link: string, deps: DependencyList = []) {
	return (query?: IQuery, config?: AxiosRequestConfig) => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpGet<TResponse>(discoveryContext.link(link, query), config).chain(events).cleaner(), deps);
		return events;
	};
}
