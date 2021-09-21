import {IQuery, IQueryHookCallback, IQueryParams, IQueryResult, SourceContext} from "@leight-core/leight";
import {PropsWithChildren, useState} from "react";

export interface ISourceContextProviderProps<TQuery extends IQueryParams = IQueryParams, TResponse = any, TOrderBy = any, TFilter = any> {
	useQuery: IQueryHookCallback<TQuery, IQuery<TOrderBy, TFilter>, IQueryResult<TResponse>>;
	live?: number | false,
	defaultSize?: number;
	defaultOrderBy?: TOrderBy | null;
	defaultFilter?: TFilter | null;
	defaultQuery?: TQuery;
}

export const SourceContextProvider = <TQuery extends IQueryParams = IQueryParams, TResponse = any, TOrderBy = any, TFilter = any>(
	{
		useQuery,
		live = false,
		defaultSize = 10,
		defaultOrderBy,
		defaultFilter,
		defaultQuery,
		children
	}: PropsWithChildren<ISourceContextProviderProps<TQuery, TResponse, TOrderBy, TFilter>>
) => {
	const [page, setPage] = useState<number>(0);
	const [orderBy, setOrderBy] = useState<TOrderBy | null | undefined>(defaultOrderBy);
	const [filter, setFilter] = useState<TFilter | null | undefined>(defaultFilter);
	const [query, setQuery] = useState<TQuery | undefined>(defaultQuery);
	const [size, setSize] = useState<number>(defaultSize);
	const result = useQuery({
		size,
		page,
		filter,
		orderBy,
	}, defaultQuery, {
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
		}}
	>
		{children}
	</SourceContext.Provider>;
};
