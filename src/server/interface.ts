import {AxiosError, CancelTokenSource} from "axios";
import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEventHandler, IEvents} from "../utils/interface";

/**
 * Callback used when a new page is required.
 */
export type IOnFetchPage = (page: number, size: number, appContext: IAppContext, events: IEvents<IServerEvents>, params?: Params) => CancelTokenSource

export interface IPage {
	page: number
	limit: number
}

export type IGetCallback<TEvents extends IEventHandler = IServerEvents> = (
	appContext: IAppContext,
	events: IEvents<TEvents>,
	params?: Params,
) => CancelTokenSource;

export type IPostCallback<TEvents extends IEventHandler = IServerEvents, TRequest = any> = (
	data: TRequest,
	appContext: IAppContext,
	events: IEvents<TEvents>,
	params?: Params,
) => CancelTokenSource

export type IDeleteCallback<TEvents extends IEventHandler = IServerEvents> = (
	appContext: IAppContext,
	events: IEvents<TEvents>,
	params?: Params,
) => CancelTokenSource

export type IPutCallback<TEvents extends IEventHandler = IServerEvents, TRequest = any> = (
	data: TRequest,
	appContext: IAppContext,
	events: IEvents<TEvents>,
	params?: Params,
) => CancelTokenSource

export type IPatchCallback<TEvents extends IEventHandler = IServerEvents, TRequest = any> = (
	data: TRequest,
	appContext: IAppContext,
	events: IEvents<TEvents>,
	params?: Params,
) => CancelTokenSource

export type IUpdateCallback = IPostCallback | IPutCallback | IPatchCallback;

export type IFetchHook<TEvents extends IEventHandler = IServerEvents> = (
	uuid: string,
	events: IEvents<TEvents>,
) => void

/**
 * Some of events may happen during http transfer.
 */
export interface IHttpErrorEvents extends IEventHandler {
	http400: (response: any) => void
	http401: (response: any) => void
	http403: (response: any) => void
	http500: (response: any) => void
}

/**
 * Events emitted in server util methods.
 */
export interface IServerEvents<TSuccess = any> extends IHttpErrorEvents {
	request: (request?: any) => void
	success: (data: TSuccess) => void
	done: () => void
	error: (error: AxiosError) => void
	catch: (error: AxiosError) => void
}
