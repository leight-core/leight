import {IMutationOptions, IPromiseMutationCallback, IPromiseQueryCallback, IQueryOptions, IQueryParams} from "@leight-core/leight";
import {AxiosRequestConfig} from "axios";
import {useMutation, useQuery} from "react-query";

export function wrapQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, promise: IPromiseQueryCallback<TQuery, TRequest, TResponse>) {
	return (request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>, config?: AxiosRequestConfig) => {
		return useQuery([link, {query, config, request}], promise(link, request, query, config), options);
	};
}

export function wrapMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, promise: IPromiseMutationCallback<TQuery, TRequest, TResponse>) {
	return (request: TRequest, query?: TQuery, options?: IMutationOptions<TResponse>, config?: AxiosRequestConfig) => {
		return useMutation([link, {query, config, request}], promise(link, request, query, config), options);
	};
}
