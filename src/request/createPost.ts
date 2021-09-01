import {httpPost, IDiscoveryContext, IPostCallback, IQuery, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";

/**
 * Simple factory for creating `post` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TRequest = any, TResponse = any>(link: string): IPostCallback<TRequest, TResponse> {
	return (
		request: TRequest,
		discoveryContext: IDiscoveryContext,
		query?: IQuery,
		config?: AxiosRequestConfig,
	) => httpPost<TRequest, TResponse>(
		discoveryContext.link(link, query),
		request,
		config,
	);
}

export function createUsePost<TRequest = any, TResponse = any>(link: string, deps: DependencyList = []) {
	return (request: TRequest, query?: IQuery, config?: AxiosRequestConfig) => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpPost<TRequest, TResponse>(discoveryContext.link(link, query), request, config).chain(events).cleaner(), deps);
		return events;
	};
}
