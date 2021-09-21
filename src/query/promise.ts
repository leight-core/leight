import {IHookPromise, IQueryParams, useLinkContext, useOptionalDiscoveryContext} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function usePutPromise<TQuery extends IQueryParams, TRequest, TResponse>(link: string, query?: TQuery, request?: TRequest, config?: AxiosRequestConfig): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return (req: TRequest | undefined = request) => new Promise<TResponse>((resolve, reject) => {
		axios.put<TResponse>(linkContext.link(link, query, discoveryContext), req, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePatchPromise<TQuery extends IQueryParams, TRequest, TResponse>(link: string, query?: TQuery, request?: TRequest, config?: AxiosRequestConfig): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return (req: TRequest | undefined = request) => new Promise<TResponse>((resolve, reject) => {
		axios.patch<TResponse>(linkContext.link(link, query, discoveryContext), req, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePostPromise<TQuery extends IQueryParams, TRequest, TResponse>(link: string, query?: TQuery, request?: TRequest, config?: AxiosRequestConfig): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return (req: TRequest | undefined = request) => new Promise<TResponse>((resolve, reject) => {
		axios.post<TResponse>(linkContext.link(link, query, discoveryContext), req, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useDeletePromise<TQuery extends IQueryParams, TResponse>(link: string, query?: TQuery, config?: AxiosRequestConfig): IHookPromise<void, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.delete<TResponse>(linkContext.link(link, query, discoveryContext), config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useGetPromise<TQuery extends IQueryParams, TResponse>(link: string, query?: TQuery, config?: AxiosRequestConfig): IHookPromise<void, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.get<TResponse>(linkContext.link(link, query, discoveryContext), config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}
