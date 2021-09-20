import {httpDelete, IDiscoveryContext, IQueryParams, IRequestEvents, IUseRequestResult, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {useQuery} from "react-query";

export interface IDeleteCallback<TQuery extends IQueryParams = IQueryParams, TResponse = any> {
	(
		discoveryContext: IDiscoveryContext,
		query?: TQuery,
	): IRequestEvents<TResponse>;
}


/**
 * Simple factory for creating `delete` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createDelete<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IDeleteCallback<TQuery, TResponse> {
	return (
		discoveryContext: IDiscoveryContext,
		query?: TQuery,
		config?: AxiosRequestConfig,
	) => httpDelete<TResponse>(
		discoveryContext.link(link, query),
		config,
	);
}

export interface IUseDeleteCallback<TQuery extends IQueryParams = IQueryParams, TResponse = any> {
	(query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse>;
}

export function createUseDelete<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IUseDeleteCallback<TQuery, TResponse> {
	return (query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse> => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		const result = useQuery([link, {query, config}], () => {
			return new Promise<TResponse>((resolve, reject) => {
				httpDelete<TResponse>(discoveryContext.link(link, query), config)
					.on("response", resolve)
					.on("error", reject)
					.chain(events);
			});
		});
		return {events, result};
	};
}
