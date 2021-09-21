import {IQueryParams, useLinkContext, useOptionalDiscoveryContext} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function usePutPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, request: TRequest, query?: TQuery, config?: AxiosRequestConfig): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.put<TResponse>(linkContext.link(link, query, discoveryContext), request, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePatchPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, request: TRequest, query?: TQuery, config?: AxiosRequestConfig): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.patch<TResponse>(linkContext.link(link, query, discoveryContext), request, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePostPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, request: TRequest, query?: TQuery, config?: AxiosRequestConfig): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.post<TResponse>(linkContext.link(link, query, discoveryContext), request, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useDeletePromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, query?: TQuery, config?: AxiosRequestConfig): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.delete<TResponse>(linkContext.link(link, query, discoveryContext), config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useGetPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, query?: TQuery, config?: AxiosRequestConfig) {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.get<TResponse>(linkContext.link(link, query, discoveryContext), config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}
