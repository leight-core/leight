import {Params} from "react-router";
import {IAppContext} from "../app/interface";
import {IPageIndex} from "../interface/interface";
import {httpPost} from "./httpPost";
import {IOnFetchPage, IPage} from "./interface";

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
		params?: Params,
	) => httpPost<IPage, IPageIndex>(
		appContext.link(link, params),
		{
			page,
			limit,
		},
	);
}
