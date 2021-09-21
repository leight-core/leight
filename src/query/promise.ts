import {IHookPromise, IQueryParams, useLinkContext, useOptionalDiscoveryContext} from "@leight-core/leight";
import axios from "axios";

export function usePutPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, query?: TQuery, request?: TRequest): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return (req: TRequest | undefined = request) => new Promise<TResponse>((resolve, reject) => {
		axios.put<TResponse>(linkContext.link(link, query, discoveryContext), req)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePatchPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, query?: TQuery, request?: TRequest): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return (req: TRequest | undefined = request) => new Promise<TResponse>((resolve, reject) => {
		axios.patch<TResponse>(linkContext.link(link, query, discoveryContext), req)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePostPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, query?: TQuery, request?: TRequest): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return (req: TRequest | undefined = request) => new Promise<TResponse>((resolve, reject) => {
		axios.post<TResponse>(linkContext.link(link, query, discoveryContext), req)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useDeletePromise<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string, query?: TQuery): IHookPromise<void, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.delete<TResponse>(linkContext.link(link, query, discoveryContext))
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useGetPromise<TQuery extends IQueryParams = IQueryParams, TResponse = any>(link: string, query?: TQuery): IHookPromise<void, TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.get<TResponse>(linkContext.link(link, query, discoveryContext))
			.then(result => resolve(result.data))
			.catch(reject);
	});
}
