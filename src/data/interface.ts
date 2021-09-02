import {IParams, IPostCallback, IQuery} from "@leight-core/leight";

export interface IPageRequest<TParams = any> {
	/** currently requested page */
	readonly page: number;

	/** limit number of items per page */
	readonly size: number;

	/** optional parameters for paging (for example filtering options, ...) */
	readonly params: IParams;
}

export interface IPageResponse<TItem> {
	/** number of total available items in the source */
	readonly total: number;

	/** current page size */
	readonly size: number;

	/** total available pages (precomputed based on total number of items and page size) */
	readonly pages: number;

	/** number of items on the current page; usually same as page size, could be less */
	readonly count: number;

	/** items on the page */
	readonly items: TItem[];
}

export interface IPageCallback<TItem> extends IPostCallback<IPageRequest, IPageResponse<TItem>> {
}


export interface IDataSourceContext<TItem> {
	/**
	 * Callback for retrieving one page of data.
	 */
	readonly page: (page: number, pageSize: number | undefined) => void;
	/**
	 * Page size
	 */
	readonly size: number;
	/**
	 * Set a new page size
	 */
	setSize: (size: number) => void;
	/**
	 * Data returned by paging.
	 */
	readonly data: IPageResponse<TItem>;
	/**
	 * Set a new paged data.
	 */
	setData: (data: IPageResponse<TItem>) => void;
	/**
	 * Is data source in loading state?
	 */
	readonly loading: boolean;
	/**
	 * Set loading state of data source.
	 */
	setLoading: (loading: boolean) => void;
	/**
	 * Access to current page params.
	 */
	readonly params: IParams;
	/**
	 * Set new page params.
	 */
	setParams: (params: IParams) => void;
	/**
	 * Access to current query used to fetch a page.
	 */
	readonly query: IQuery;
	/**
	 * Set a new query.
	 */
	setQuery: (query: IQuery) => void;
}
