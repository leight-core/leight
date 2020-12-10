import {CancelTokenSource} from "axios";
import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";

/**
 * Callback used when a new page is required.
 */
export type IOnFetchPage = (page: number, size: number, appContext: IAppContext, events: IEvents, params?: Params) => CancelTokenSource

export interface IPage {
	page: number
	limit: number
}
