import {IPostCallback} from "../request";

export interface IPageRequest<TParams = any> {
	/** currently requested page */
	page: number;

	/** limit number of items per page */
	size: number;

	/** optional parameters for paging (for example filtering options, ...) */
	params?: any[] | null;
}

export interface IPageResponse<TItem> {
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

export interface IPageCallback<TItem> extends IPostCallback<IPageRequest, IPageResponse<TItem>> {
}


export interface IDataSourceContext<TItem> {
	/**
	 * Callback for retrieving one page of data.
	 */
	readonly page: IPageCallback<TItem>;
	readonly data: IPageResponse<TItem>;
	setData: (data: IPageResponse<TItem>) => void;
}
