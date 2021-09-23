import {IQuery, IQueryHookCallback, IQueryOptions, IQueryParams, IQueryResult, merge, SourceContext} from "@leight-core/leight";
import {PropsWithChildren, useEffect, useState} from "react";

export interface ISourceContextProviderProps<TQuery extends IQueryParams = IQueryParams, TResponse = any, TOrderBy = any, TFilter = any> {
	/**
	 * Source of the query
	 */
	useQuery: IQueryHookCallback<TQuery, IQuery<TOrderBy, TFilter>, IQueryResult<TResponse>>;
	/**
	 * Enables live refetches of the query
	 */
	live?: number | false,
	/**
	 * Default (initial) page; if out of range, an error occurs
	 */
	defaultPage?: number;
	/**
	 * Default page size.
	 */
	defaultSize?: number;
	/**
	 * Default order by when source is loaded.
	 */
	defaultOrderBy?: TOrderBy | null;
	/**
	 * Default filter when source is loaded; it could be overridden later on.
	 */
	defaultFilter?: TFilter | null;
	/**
	 * Default query params when source is loaded.
	 */
	defaultQuery?: TQuery;
	/**
	 * Query options.
	 */
	options?: IQueryOptions<IQueryResult<TResponse>>;
	/**
	 * Hard filter - all changes are merged against this one.
	 */
	filter?: TFilter
	/**
	 * Hard order by - all changes are merged with this one.
	 */
	orderBy?: TOrderBy
	/**
	 * Hard query - all changes are merge with this one.
	 */
	query?: TQuery
}

export const SourceContextProvider = <TQuery extends IQueryParams = IQueryParams, TResponse = any, TOrderBy = any, TFilter = any>(
	{
		useQuery,
		live = false,
		defaultPage = 0,
		defaultSize = 10,
		defaultOrderBy,
		defaultFilter,
		defaultQuery,
		options,
		children,
		...props
	}: PropsWithChildren<ISourceContextProviderProps<TQuery, TResponse, TOrderBy, TFilter>>
) => {
	const [page, setPage] = useState<number>(defaultPage);
	const [orderBy, setOrderBy] = useState<TOrderBy | null | undefined>(merge<TOrderBy, TOrderBy>(defaultOrderBy || {}, props.orderBy || {}));
	const [filter, setFilter] = useState<TFilter | null | undefined>(merge<TFilter, TFilter>(defaultFilter || {}, props.filter || {}));
	const [query, setQuery] = useState<TQuery | undefined>(merge<TQuery, TQuery>(defaultQuery || {}, props.query || {}));
	const [size, setSize] = useState<number>(defaultSize);

	const result = useQuery({
		size,
		page,
		filter,
		orderBy,
	}, query, options || {
		keepPreviousData: true,
		refetchInterval: live,
	});

	useEffect(() => {
		setFilter(props.filter);
	}, [props.filter]);
	useEffect(() => {
		setOrderBy(props.orderBy);
	}, [props.orderBy]);
	useEffect(() => {
		setQuery(props.query);
	}, [props.query]);

	return <SourceContext.Provider
		value={{
			result,
			page,
			setPage: (page, size) => {
				setPage(page);
				setSize(size || defaultSize);
			},
			size,
			setSize,
			orderBy,
			setOrderBy: orderBy => setOrderBy(merge<TOrderBy, TOrderBy>(orderBy, props.orderBy || {})),
			filter,
			setFilter: filter => setFilter(merge<TFilter, TFilter>(filter, props.filter || {})),
			query,
			setQuery: query => setQuery(merge<TQuery, TQuery>(query, props.query || {})),
			pagination: function () {
				return result.isSuccess ? {
					total: result.data.total,
					pageSize: result.data.size,
					defaultPageSize: result.data.size,
					showQuickJumper: true,
					hideOnSinglePage: true,
					onChange: (current, size) => this.setPage(current - 1, size),
				} : undefined;
			}
		}}
	>
		{children}
	</SourceContext.Provider>;
};
