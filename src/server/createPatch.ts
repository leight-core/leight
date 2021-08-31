import {httpPatch, IDiscoveryContext, IParams, IPatchCallback, ServerEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";

/**
 * Simple factory for creating `patch` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPatch<TRequest = any, TResponse = any>(link: string): IPatchCallback<TRequest, TResponse> {
	return (
		request: TRequest,
		discoveryContext: IDiscoveryContext,
		params?: IParams,
		config?: AxiosRequestConfig,
	) => httpPatch<TRequest, TResponse>(
		discoveryContext.link(link, params),
		request,
		config,
	);
}

export function createUsePatch<TRequest = any, TResponse = any>(link: string, deps: DependencyList = []) {
	return (request: TRequest, params?: IParams, config?: AxiosRequestConfig) => {
		const events = ServerEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpPatch<TRequest, TResponse>(discoveryContext.link(link, params), request, config).chain(events).cleaner(), deps);
		return events;
	};
}
