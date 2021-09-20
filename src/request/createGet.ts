import {httpGet, IDiscoveryContext, IQueryParams, IRequestCallback, IUseRequestResult, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {useQuery} from "react-query";

export interface IGetCallback<TQuery extends IQueryParams = IQueryParams, TResponse = any> extends IRequestCallback<TQuery, void, TResponse> {
}

/**
 * Simple factory for creating `get` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createGet<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IGetCallback<TQuery, TResponse> {
	return (
		request,
		discoveryContext: IDiscoveryContext,
		query?: TQuery,
		config?: AxiosRequestConfig,
	) => httpGet<TResponse>(
		discoveryContext.link(link, query),
		config,
	);
}

export interface IUseGetCallback<TQuery extends IQueryParams = IQueryParams, TResponse = any> {
	(query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse>;
}

export function createUseGet<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string): IUseGetCallback<TQuery, TResponse> {
	return (query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse> => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		const result = useQuery([link, {query, config}], () => {
			return new Promise<TResponse>((resolve, reject) => {
				httpGet<TResponse>(discoveryContext.link(link, query), config)
					.on("response", resolve)
					.on("error", reject)
					.chain(events);
			});
		});
		return {events, result};
	};
}
