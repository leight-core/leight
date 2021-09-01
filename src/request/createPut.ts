import {httpPut, IDiscoveryContext, IPutCallback, IQuery, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";

/**
 * Simple factory for creating `put` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPut<TRequest = any, TResponse = any>(link: string): IPutCallback<TRequest, TResponse> {
	return (
		request: TRequest,
		discoveryContext: IDiscoveryContext,
		query?: IQuery,
		config?: AxiosRequestConfig,
	) => httpPut<TRequest, TResponse>(
		discoveryContext.link(link, query),
		request,
		config,
	);
}

export function createUsePut<TRequest = any, TResponse = any>(link: string, deps: DependencyList = []) {
	return (request: TRequest, query?: IQuery, config?: AxiosRequestConfig) => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpPut<TRequest, TResponse>(discoveryContext.link(link, query), request, config).chain(events).cleaner(), deps);
		return events;
	};
}
