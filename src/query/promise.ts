import {IQueryParams, useLinkContext, useOptionalDiscoveryContext} from "@leight-core/leight";
import axios from "axios";

export function usePutPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, request: TRequest, query?: TQuery): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.put<TResponse>(linkContext.link(link, query, discoveryContext), request)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePatchPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, request: TRequest, query?: TQuery): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.patch<TResponse>(linkContext.link(link, query, discoveryContext), request)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePostPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, request: TRequest, query?: TQuery): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.post<TResponse>(linkContext.link(link, query, discoveryContext), request)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useDeletePromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, query?: TQuery): () => Promise<TResponse> {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.delete<TResponse>(linkContext.link(link, query, discoveryContext))
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useGetPromise<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, query?: TQuery) {
	const linkContext = useLinkContext();
	const discoveryContext = useOptionalDiscoveryContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.get<TResponse>(linkContext.link(link, query, discoveryContext))
			.then(result => resolve(result.data))
			.catch(reject);
	});
}
