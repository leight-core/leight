import {IBaseEventTypes, IDiscoveryContext, IEventHandlers, IEventResult, IEvents, IQueryOptions, IQueryParams} from "@leight-core/leight";
import {AxiosError, AxiosRequestConfig} from "axios";
import {UseQueryResult} from "react-query";

/**
 * Available http events.
 */
export type IHttpErrorEventTypes = "http400" | "http401" | "http403" | "http409" | "http500" | IBaseEventTypes;

/**
 * Some of events may happen during http transfer.
 */
export interface IHttpErrorEvents extends IEventHandlers {
	http400: (response: any) => IEventResult;
	http401: (response: any) => IEventResult;
	http403: (response: any) => IEventResult;
	http500: (response: any) => IEventResult;
}

/**
 * Available server events.
 */
export type IRequestEventTypes = "request" | "response" | "catch" | "error" | "done" | IHttpErrorEventTypes;

/**
 * Events emitted in server util methods.
 */
export interface IRequestEventHandlers<TResponse = any> extends IHttpErrorEvents {
	request: <TRequest>(request?: TRequest) => void;
	response: (data: TResponse) => void;
	done: () => void;
	error: (error: AxiosError) => void;
	catch: (error: AxiosError) => void;
}

export interface IRequestEvents<TResponse = any> extends IEvents<IRequestEventTypes, IRequestEventHandlers<TResponse>> {
}

/**
 * Possible callbacks used to update a resource.
 */
export interface IRequestCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(
		data: TRequest,
		discoveryContext: IDiscoveryContext,
		query?: TQuery,
		config?: AxiosRequestConfig,
	): IRequestEvents<TResponse>;
}

export interface IRequestHookResult<TResponse = any> {
	result: UseQueryResult<TResponse>;
	events: IRequestEvents<TResponse>;
}

export interface IRequestHookCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>, config?: AxiosRequestConfig): IRequestHookResult<TResponse>;
}
