import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpPost} from "./httpPost";
import {IPostCallback} from "./interface";

/**
 * Simple factory for creating post based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPost<TRequest = any>(link: string): IPostCallback<TRequest> {
	return (
		data: TRequest,
		appContext: IAppContext,
		events: IEvents,
		params?: Params,
	) => httpPost<TRequest>(
		appContext.link(link, params),
		data,
		events,
	);
}
