import {CancelTokenSource} from "axios";
import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";

/**
 * Callback used when a new page is required.
 */
export type IOnFetchPage = (page: number, size: number, appContext: IAppContext, events: IEvents<IServerEvents>, params?: Params) => CancelTokenSource

export interface IPage {
	page: number
	limit: number
}

export type IGetCallback<TEvents extends string = IServerEvents> = (
	appContext: IAppContext,
	events: IEvents<TEvents>,
	params?: Params,
) => CancelTokenSource;

export type IPostCallback<TEvents extends string = IServerEvents, TRequest = any> = (
	data: TRequest,
	appContext: IAppContext,
	events: IEvents<TEvents>,
	params?: Params,
) => CancelTokenSource

export type IFetchHook<TEvents extends string = IServerEvents> = (
	uuid: string,
	events: IEvents<TEvents>,
) => void

/**
 * Some of events may happen during http transfer.
 */
export type IHttpErrorEvents = "http-400" | "http-401" | "http-403" | "http-500"
/**
 * Events emitted in server util methods.
 */
export type IServerEvents = "request" | "success" | "done" | "catch" | IHttpErrorEvents
