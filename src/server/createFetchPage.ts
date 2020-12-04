import {Params} from "react-router";
import {IAppContext} from "../app/AppContext";
import {IEvents} from "../utils/Events";
import {httpPost} from "./httpPost";

export interface IPage {
	page: number
	limit: number
}

/**
 * Simple factory for making HTTP post for paging over resource support.
 *
 * @param link Discovery Index link id
 */
export function createFetchPage(link: string) {
	return (
		page: number,
		limit: number,
		appContext: IAppContext,
		events: IEvents,
		params?: Params,
	) => httpPost<IPage>(
		appContext.link(link, params),
		{
			page,
			limit,
		},
		events,
	);
}
