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
	readonly size: number;
	setSize: (size: number) => void;
	readonly data: IPageResponse<TItem>;
	setData: (data: IPageResponse<TItem>) => void;
	readonly loading: boolean;
	setLoading: (loading: boolean) => void;
	readonly params: IParams;
	setParams: (params: IParams) => void;
	readonly query: IQuery;
	setQuery: (query: IQuery) => void;
}
