import {UseMutationResult, UseQueryResult} from "react-query";
import {UseMutationOptions, UseQueryOptions} from "react-query/types/react/types";

export type IQueryParams = NodeJS.Dict<string | number | boolean | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<boolean> | null> | undefined;

export type IQueryOptions<TResponse> = Omit<UseQueryOptions<TResponse, any, TResponse, any>, "queryKey" | "queryFn">
export type IMutationOptions<TResponse, TError = any, TVariables = any, TContext = unknown> = Omit<UseMutationOptions<TResponse, TError, TVariables, TContext>, "mutationKey" | "mutationFn">

export interface IPromiseQueryCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(link: string, request: TRequest, query?: TQuery): () => Promise<TResponse>;
}

export interface IPromiseMutationCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(link: string, request: TRequest, query?: TQuery): () => Promise<TResponse>;
}

export interface IQueryHookCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>): UseQueryResult<TResponse>;
}

export interface IMutationHookCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request: TRequest, query?: TQuery, options?: IMutationOptions<TResponse, undefined, undefined, undefined>): UseMutationResult<TResponse, undefined, undefined, undefined>;
}
