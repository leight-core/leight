import {CancelTokenSource} from "axios";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpGet} from "./httpGet";

export type IGetCallback = (
	appContext: IAppContext,
	events: IEvents,
) => CancelTokenSource;

/**
 * Simple factory for creating get based on the discovery link id.
 *
 * @param link Discovery link id.
 */
export function createGet(link: string): IGetCallback {
	return (
		appContext: IAppContext,
		events: IEvents,
	) => httpGet(
		appContext.link(link),
		events,
	);
}
