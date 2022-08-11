import {IHookPromise, IQueryParams, useLinkContext} from "@leight-core/leight";
import axios, {AxiosRequestConfig} from "axios";

export function usePutPromise<TQuery extends IQueryParams, TRequest, TResponse>(link: string, query?: TQuery, request?: TRequest, config?: AxiosRequestConfig): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	return (req?: TRequest) => new Promise<TResponse>((resolve, reject) => {
		axios.put<TResponse>(linkContext.link(link, query), request || req, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePatchPromise<TQuery extends IQueryParams, TRequest, TResponse>(link: string, query?: TQuery, request?: TRequest, config?: AxiosRequestConfig): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	return (req?: TRequest) => new Promise<TResponse>((resolve, reject) => {
		axios.patch<TResponse>(linkContext.link(link, query), request || req, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function usePostPromise<TQuery extends IQueryParams, TRequest, TResponse>(link: string, query?: TQuery, request?: TRequest, config?: AxiosRequestConfig): IHookPromise<TRequest, TResponse> {
	const linkContext = useLinkContext();
	return (req?: TRequest) => new Promise<TResponse>((resolve, reject) => {
		axios.post<TResponse>(linkContext.link(link, query), request || req, config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useDeletePromise<TQuery extends IQueryParams, TResponse>(link: string, query?: TQuery, config?: AxiosRequestConfig): IHookPromise<void, TResponse> {
	const linkContext = useLinkContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.delete<TResponse>(linkContext.link(link, query), config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}

export function useGetPromise<TQuery extends IQueryParams, TResponse>(link: string, query?: TQuery, config?: AxiosRequestConfig): IHookPromise<void, TResponse> {
	const linkContext = useLinkContext();
	return () => new Promise<TResponse>((resolve, reject) => {
		axios.get<TResponse>(linkContext.link(link, query), config)
			.then(result => resolve(result.data))
			.catch(reject);
	});
}
