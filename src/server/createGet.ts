import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpGet} from "./httpGet";
import {IGetCallback, IServerEvents} from "./interface";

/**
 * Simple factory for creating get based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createGet(link: string): IGetCallback {
	return (
		appContext: IAppContext,
		events: IEvents<IServerEvents>,
		params?: Params,
	) => httpGet(
		appContext.link(link, params),
		events,
	);
}
