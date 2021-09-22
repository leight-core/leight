import {IQuery, IQueryHookCallback, IQueryParams, IQueryResult, SourceContext} from "@leight-core/leight";
import {PropsWithChildren, useState} from "react";

export interface ISourceContextProviderProps<TQuery extends IQueryParams = IQueryParams, TResponse = any, TOrderBy = any, TFilter = any> {
	useQuery: IQueryHookCallback<TQuery, IQuery<TOrderBy, TFilter>, IQueryResult<TResponse>>;
	live?: number | false,
	defaultPage?: number;
	defaultSize?: number;
	defaultOrderBy?: TOrderBy | null;
	defaultFilter?: TFilter | null;
	defaultQuery?: TQuery;
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
		children
	}: PropsWithChildren<ISourceContextProviderProps<TQuery, TResponse, TOrderBy, TFilter>>
) => {
	const [page, setPage] = useState<number>(defaultPage);
	const [orderBy, setOrderBy] = useState<TOrderBy | null | undefined>();
	const [filter, setFilter] = useState<TFilter | null | undefined>();
	const [query, setQuery] = useState<TQuery | undefined>();
	const [size, setSize] = useState<number>(defaultSize);
	const result = useQuery({
		size,
		page,
		filter,
		orderBy,
	}, query, {
		keepPreviousData: true,
		refetchInterval: live,
	});

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
			setOrderBy,
			filter,
			setFilter,
			query,
			setQuery,
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
