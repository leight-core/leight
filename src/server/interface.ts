import {AxiosError} from "axios";
import {IDiscoveryContext} from "../discovery/interface";
import {IEventHandlers, IEventResult, IEvents} from "../event/interface";
import {IPageIndex, IParams} from "../interface/interface";

/**
 * Available http events.
 */
export type IHttpErrorEventTypes = "http400" | "http401" | "http403" | "http500";

/**
 * Some of events may happen during http transfer.
 */
export interface IHttpErrorEvents extends IEventHandlers {
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
export type IOnFetchPage<TItem = any> = (
	page: number,
	size: number,
	discoveryContext: IDiscoveryContext,
	params?: IParams,
	extra?: any,
) => IServerEvents<IPageIndex<TItem>>

export interface IPage {
	page: number
	limit: number
	params?: any
}

export interface IGetCallback<TResponse = any> {
	(
		discoveryContext: IDiscoveryContext,
		params?: IParams,
	): IServerEvents<TResponse>;
}

/**
 * Possible callbacks used to update a resource.
 */
export interface IUpdateCallback<TRequest = any, TResponse = any> {
	(
		data: TRequest,
		discoveryContext: IDiscoveryContext,
		params?: IParams,
	): IServerEvents<TResponse>
}

export interface IPostCallback<TRequest = any, TResponse = any> extends IUpdateCallback<TRequest, TResponse> {
}

export interface IPutCallback<TRequest = any, TResponse = any> extends IUpdateCallback<TRequest, TResponse> {
}

export interface IPatchCallback<TRequest = any, TResponse = any> extends IUpdateCallback<TRequest, TResponse> {
}

export interface IDeleteCallback<TResponse = any> {
	(
		discoveryContext: IDiscoveryContext,
		params?: IParams,
	): IServerEvents<TResponse>
}
