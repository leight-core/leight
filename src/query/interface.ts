import {AxiosRequestConfig} from "axios";
import {UseMutationResult, UseQueryResult} from "react-query";
import {UseMutationOptions, UseQueryOptions} from "react-query/types/react/types";
import {IPageRequest, IPageResponse} from "../data";
import {IRequestCallback} from "../request";

export type IQueryParams = NodeJS.Dict<string | number | boolean | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<boolean> | null> | undefined;

export interface IQueryCallback<TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = void, TFilter = void> extends IRequestCallback<TQuery, IPageRequest<TOrderBy, TFilter>, IPageResponse<TItem>> {
}

export type IQueryOptions<TResponse> = Omit<UseQueryOptions<TResponse, any, TResponse, any>, "queryKey" | "queryFn">
export type IMutationOptions<TResponse, TError = any, TVariables = any, TContext = unknown> = Omit<UseMutationOptions<TResponse, TError, TVariables, TContext>, "mutationKey" | "mutationFn">

export interface IPromiseQueryCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(link: string, request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>, config?: AxiosRequestConfig): () => Promise<TResponse>;
}

export interface IPromiseMutationCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(link: string, request: TRequest, query?: TQuery, options?: IMutationOptions<TResponse>, config?: AxiosRequestConfig): () => Promise<TResponse>;
}

export interface IQueryHookCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>, config?: AxiosRequestConfig): UseQueryResult<TResponse>;
}

export interface IMutationHookCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request: TRequest, query?: TQuery, options?: IMutationOptions<TResponse>, config?: AxiosRequestConfig): UseMutationResult<TResponse>;
}
