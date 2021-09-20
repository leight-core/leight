import {httpPatch, IDiscoveryContext, IQueryParams, IRequestCallback, IUseRequestResult, RequestEvents, useDiscoveryContext} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {useQuery} from "react-query";

export interface IPatchCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> extends IRequestCallback<TQuery, TRequest, TResponse> {
}

/**
 * Simple factory for creating `patch` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPatch<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IPatchCallback<TQuery, TRequest, TResponse> {
	return (
		request: TRequest,
		discoveryContext: IDiscoveryContext,
		query?: TQuery,
		config?: AxiosRequestConfig,
	) => httpPatch<TRequest, TResponse>(
		discoveryContext.link(link, query),
		request,
		config,
	);
}

export interface IUsePatchCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request: TRequest, query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse>;
}

export function createUsePatch<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IUsePatchCallback<TQuery, TRequest, TResponse> {
	return (request: TRequest, query?: TQuery, config?: AxiosRequestConfig): IUseRequestResult<TResponse> => {
		const events = RequestEvents<TResponse>();
		const discoveryContext = useDiscoveryContext();
		const result = useQuery([link, {query, config}], () => {
			return new Promise<TResponse>((resolve, reject) => {
				httpPatch<TRequest, TResponse>(discoveryContext.link(link, query), request, config)
					.on("response", resolve)
					.on("error", reject)
					.chain(events);
			});
		});
		return {events, result};
	};
}
