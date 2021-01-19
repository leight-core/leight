import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IEvents} from "../utils/interface";
import {httpPost} from "./httpPost";
import {IOnFetchPage, IPage, IServerEvents} from "./interface";

/**
 * Simple factory for making HTTP post for paging over resource support.
 *
 * @param link Discovery Index link id
 */
export function createFetchPage(link: string): IOnFetchPage {
	return (
		page: number,
		limit: number,
		appContext: IAppContext,
		events: IEvents<IServerEvents>,
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
