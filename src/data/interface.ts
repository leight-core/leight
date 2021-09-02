import {IPostCallback, IQuery} from "@leight-core/leight";

export interface IPageRequest<TOrderBy = never> {
	/** currently requested page */
	readonly page: number;

	/** limit number of items per page */
	readonly size: number;

	/** support for ordering items */
	readonly orderBy?: TOrderBy | null;
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

export interface IPageCallback<TItem, TOrderBy = never> extends IPostCallback<IPageRequest<TOrderBy>, IPageResponse<TItem>> {
}

export interface IDataSourceContext<TItem, TOrderBy = never> {
	/**
	 * Current page
	 */
	readonly page: number;
	/**
	 * Set a new page (and eventually size).
	 */
	setPage: (page: number, pageSize?: number) => void;
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
	 * Current order by.
	 */
	readonly orderBy?: TOrderBy | null;
	/**
	 * Set new order by.
	 */
	setOrderBy: (orderBy?: TOrderBy | null) => void;
	/**
	 * Access to current query used to fetch a page.
	 */
	readonly query: IQuery;
	/**
	 * Set a new query.
	 */
	setQuery: (query: IQuery) => void;
}
