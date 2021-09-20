import {httpPost, IDiscoveryContext, IQueryParams, IRequestCallback, IUseRequestResult, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {useQuery} from "react-query";

export interface IPostCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> extends IRequestCallback<TQuery, TRequest, TResponse> {
}

/**
 * Simple factory for creating `post` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IPostCallback<TQuery, TRequest, TResponse> {
	return (
		request: TRequest,
		discoveryContext: IDiscoveryContext,
		query?: TQuery,
		config?: AxiosRequestConfig,
	) => httpPost<TRequest, TResponse>(
		discoveryContext.link(link, query),
		request,
		config,
	);
}

export interface IUsePostCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request: TRequest, query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse>;
}

export function createUsePost<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IUsePostCallback<TQuery, TRequest, TResponse> {
	return (request: TRequest, query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse> => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		const result = useQuery([link, {query, config}], () => {
			return new Promise<TResponse>((resolve, reject) => {
				httpPost<TRequest, TResponse>(discoveryContext.link(link, query), request, config)
					.on("response", resolve)
					.on("error", reject)
					.chain(events);
			});
		});
		return {events, result};
	};
}
