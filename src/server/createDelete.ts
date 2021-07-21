import {AxiosRequestConfig} from "axios";
import {DependencyList, useEffect} from "react";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IDiscoveryContext} from "../discovery/interface";
import {IParams} from "../link/interface";
import {httpDelete} from "./httpDelete";
import {IDeleteCallback} from "./interface";
import {ServerEvents} from "./ServerEvents";

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

export function createUseDelete<TResponse = any>(link: string, deps: DependencyList = []) {
	return (params?: IParams, config?: AxiosRequestConfig) => {
		const events = ServerEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		useEffect(() => httpDelete<TResponse>(discoveryContext.link(link, params), config).chain(events).cleaner(), deps);
		return events;
	};
}
