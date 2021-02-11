import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpPut} from "./httpPut";
import {IPutCallback, IServerEvents} from "./interface";

/**
 * Simple factory for creating `put` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createPut<TRequest = any>(link: string): IPutCallback<IServerEvents, TRequest> {
	return (
		data: TRequest,
		appContext: IAppContext,
		events: IEvents<IServerEvents>,
		params?: Params,
	) => httpPut<TRequest>(
		appContext.link(link, params),
		data,
		events,
	);
}
