import {httpDelete, IDeleteCallback, IDiscoveryContext, IQuery, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";

/**
 * Simple factory for creating `delete` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createDelete<TResponse = any>(link: string): IDeleteCallback<TResponse> {
	return (
		discoveryContext: IDiscoveryContext,
		query?: IQuery,
		config?: AxiosRequestConfig,
	) => httpDelete<TResponse>(
		discoveryContext.link(link, query),
		config,
	);
}

export function createUseDelete<TResponse = any>(link: string, deps: DependencyList = []) {
	return (query?: IQuery, config?: AxiosRequestConfig) => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpDelete<TResponse>(discoveryContext.link(link, query), config).chain(events).cleaner(), deps);
		return events;
	};
}
