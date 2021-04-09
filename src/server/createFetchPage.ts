import {IDiscoveryContext} from "../discovery/interface";
import {IPageIndex, IParams} from "../interface/interface";
import {httpPost} from "./httpPost";
import {IFetchPageCallback, IPage} from "./interface";

/**
 * Simple factory for making HTTP post for paging over resource support.
 *
 * @param link Discovery Index link id
 */
export function createFetchPage<TItem = any>(link: string): IFetchPageCallback<TItem> {
	return (
		page: number,
		limit: number,
		discoveryContext: IDiscoveryContext,
		params?: IParams,
		extra?: any,
	) => httpPost<IPage, IPageIndex>(
		discoveryContext.link(link, params),
		{
			page,
			limit,
			params: extra,
		},
	);
}
