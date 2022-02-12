import {TablePaginationConfig} from "antd";
import {PaginationConfig} from "antd/es/pagination";
import {UseMutationResult, UseQueryResult} from "react-query";
import {UseMutationOptions, UseQueryOptions} from "react-query/types/react/types";

export type IQueryParams = NodeJS.Dict<string | number | boolean | ReadonlyArray<string> | ReadonlyArray<number> | ReadonlyArray<boolean> | null> | undefined | void;

export type IQueryOptions<TResponse> = Omit<UseQueryOptions<TResponse, any, TResponse, any>, "queryKey" | "queryFn">
export type IMutationOptions<TResponse, TError = any, TVariables = any, TContext = unknown> = Omit<UseMutationOptions<TResponse, TError, TVariables, TContext>, "mutationKey" | "mutationFn">

export interface IHookPromise<TRequest = any, TResponse = any> {
	(request?: TRequest): Promise<TResponse>;

	(): Promise<TResponse>;
}

export interface IPromiseQueryCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(link: string, query?: TQuery, request?: TRequest): IHookPromise<TRequest, TResponse>;

	(link: string, query?: TQuery): IHookPromise<TRequest, TResponse>;
}

export interface IPromiseMutationCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(link: string, query?: TQuery): IHookPromise<TRequest, TResponse>;
}

export interface IQueryHookCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(request?: TRequest, query?: TQuery, options?: IQueryOptions<TResponse>): UseQueryResult<TResponse, any>;
}

export interface IMutationHookCallback<TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any> {
	(query?: TQuery, options?: IMutationOptions<TResponse, any, TRequest, undefined>): UseMutationResult<TResponse, any, TRequest, undefined>;
}

export interface IQuery<TOrderBy = void, TFilter = void> {
	/** currently requested page */
	readonly page: number;

	/** limit number of items per page */
	readonly size: number;

	/** support for ordering items */
	readonly orderBy?: TOrderBy | null;
	/**
	 * support for exact item filtering (like by an id or name or whatever)
	 */
	readonly filter?: TFilter | null;
}

export interface IQueryResult<TItem> {
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

export interface ISourceContext<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> {
	readonly result: UseQueryResult<IQueryResult<TResponse>, any>;
	/**
	 * Current page
	 */
	readonly page: number;

	/**
	 * Set a new page (and eventually size).
	 */
	setPage(page: number, pageSize?: number): void;

	/**
	 * Page size
	 */
	readonly size: number;

	/**
	 * Set a new page size
	 */
	setSize(size: number): void;

	/**
	 * Current order by.
	 */
	readonly orderBy?: TOrderBy | null;

	/**
	 * Set new order by.
	 */
	setOrderBy(orderBy?: TOrderBy | null): void;

	/**
	 * Merge the given orders with current state.
	 */
	mergeOrderBy(orderBy?: TOrderBy | null): void;

	readonly filter?: TFilter | null;

	setFilter(filter?: TFilter | null): void;

	/**
	 * Merge current filters with the given one.
	 */
	mergeFilter(filter?: TFilter | null): void;

	/**
	 * Access to current query used to fetch a page.
	 */
	readonly query: TQuery;

	/**
	 * Set a new query.
	 */
	setQuery(query?: TQuery): void;

	/**
	 * Merge queries with the given one.
	 */
	mergeQuery(query?: TQuery): void;

	pagination(): (TablePaginationConfig & PaginationConfig) | false | undefined;

	hasData(): boolean;

	map(mapper: (item: TResponse) => any): any;

	data(): IQueryResult<TResponse>;
}
