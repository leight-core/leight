import {AxiosError, CancelTokenSource} from "axios";
import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IPageIndex} from "../interface/interface";
import {IEventHandlers, IEventResult, IEvents} from "../utils/interface";

/**
 * Available http events.
 */
export type IHttpErrorEventTypes = "http400" | "http401" | "http403" | "http500";

/**
 * Some of events may happen during http transfer.
 */
export interface IHttpErrorEvents extends IEventHandlers<IHttpErrorEventTypes> {
	http400: (response: any) => IEventResult
	http401: (response: any) => IEventResult
	http403: (response: any) => IEventResult
	http500: (response: any) => IEventResult
}

/**
 * Available server events.
 */
export type IServerEventTypes = "request" | "response" | "catch" | "error" | "done" | IHttpErrorEventTypes;

/**
 * Events emitted in server util methods.
 */
export interface IServerEventHandlers<TResponse = any> extends IHttpErrorEvents {
	request: <TRequest>(request?: TRequest) => void
	response: (data: TResponse) => void
	done: () => void
	error: (error: AxiosError) => void
	catch: (error: AxiosError) => void
}

export interface IServerEvents<TResponse = any> extends IEvents<IServerEventTypes, IServerEventHandlers<TResponse>> {
}

/**
 * Callback used when a new page is required.
 */
export type IOnFetchPage = (page: number, size: number, appContext: IAppContext, events: IServerEvents<IPageIndex>, params?: Params) => CancelTokenSource

export interface IPage {
	page: number
	limit: number
}

export interface IGetCallback<TResponse = any> {
	(
		appContext: IAppContext,
		events: IServerEvents<TResponse>,
		params?: Params,
	): CancelTokenSource;
}

/**
 * Possible callbacks used to update a resource.
 */
export interface IUpdateCallback<TRequest = any, TResponse = any> {
	(
		data: TRequest,
		appContext: IAppContext,
		events: IServerEvents<TResponse>,
		params?: Params,
	): CancelTokenSource
}

export interface IPostCallback<TRequest = any, TResponse = any> extends IUpdateCallback<TRequest, TResponse> {
}

export interface IPutCallback<TRequest = any, TResponse = any> extends IUpdateCallback<TRequest, TResponse> {
}

export interface IPatchCallback<TRequest = any, TResponse = any> extends IUpdateCallback<TRequest, TResponse> {
}

export interface IDeleteCallback<TResponse = any> {
	(
		appContext: IAppContext,
		events: IServerEvents<TResponse>,
		params?: Params,
	): CancelTokenSource
}

/**
 * Marker type for fetching a resource by an uuid.
 */
export interface IFetchHook<TResponse = any> {
	(uuid: string, events: IServerEvents<TResponse>): void
}
