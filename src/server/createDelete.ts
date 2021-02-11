import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpDelete} from "./httpDelete";
import {IDeleteCallback, IServerEvents} from "./interface";

/**
 * Simple factory for creating `delete` based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createDelete(link: string): IDeleteCallback {
	return (
		appContext: IAppContext,
		events: IEvents<IServerEvents>,
		params?: Params,
	) => httpDelete(
		appContext.link(link, params),
		events,
	);
}
