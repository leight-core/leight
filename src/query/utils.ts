import {IMutationHookCallback, IMutationOptions, IPromiseMutationCallback, IPromiseQueryCallback, IQueryHookCallback, IQueryOptions, IQueryParams} from "@leight-core/leight";
import {useMutation, useQuery} from "react-query";

export function wrapQuery<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, promise: IPromiseQueryCallback<TQuery, TRequest, TResponse>): IQueryHookCallback<TQuery, TRequest, TResponse> {
	return (request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>) => {
		return useQuery(["query", link, {query, request}], promise(link, request, query), options);
	};
}

export function wrapMutation<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any>(link: string, promise: IPromiseMutationCallback<TQuery, TRequest, TResponse>): IMutationHookCallback<TQuery, TRequest, TResponse> {
	return (request: TRequest, query?: TQuery, options?: IMutationOptions<TResponse, undefined, undefined, undefined>) => {
		return useMutation(["mutation", link, {query, request}], promise(link, request, query), options);
	};
}
