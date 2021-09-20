import {IQueryOptions, IQueryParams, IRequestHookCallback, useLinkContext, useOptionalDiscoveryContext} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";
import {useQuery} from "react-query";

export function createPutHook<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string): IRequestHookCallback<TQuery, TRequest, TResponse> {
	return (request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>, config?: AxiosRequestConfig) => {
		return useQuery([link, {query, config}], usePutPromise<TQuery, TRequest, TResponse>(link, request, query, options), options);
	};
}

export function usePutPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>, config?: AxiosRequestConfig) {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.put<TResponse>(linkContext.link(link, query, discoveryContext), request, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}
