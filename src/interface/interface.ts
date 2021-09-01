import {IPostCallback} from "@leight-core/leight";

export interface IOutputMapper {
	<T extends Object = any>(values: T): T;
}

export interface IDeepMerge {
	<T1, T2>(x: Partial<T1>, y: Partial<T2>): T1 & T2;
}

/**
 * Basic record must have an ID, thus all records must be extended from this type.
 */
export interface IRecordItem {
	id: string;
}

export interface IPageRequest<TParams = any> {
	/** currently requested page */
	page: number;

	/** limit number of items per page */
	size: number;

	/** optional parameters for paging (for example filtering options, ...) */
	params?: any[] | null;
}

export interface IPageIndex<TItem> {
	/** number of total available items in the source */
	total: number;

	/** current page size */
	size: number;

	/** total available pages (precomputed based on total number of items and page size) */
	pages: number;

	/** number of items on the current page; usually same as page size, could be less */
	count: number;

	/** items on the page */
	items: TItem[];
}

export interface ISearchRequest<TParams = any> {
	/** the search string */
	search: string;

	/** limit of returned results (could be internally overridden if too high) */
	limit?: number | null;

	/** extra parameters used for example for result filtering (eg. search just in the context of a client) */
	params?: any[] | null;
}

export interface ISearchItem {
	id: string;

	name: string;

	type: string;
}

export interface ISearchResult {
	items: ISearchItem[];
}

export interface IPageCallback<TItem> extends IPostCallback<IPageRequest, IPageIndex<TItem>> {
}
