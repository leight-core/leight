import {DataContext, IPageResponse, IQueryCallback, IQueryParams, PageIndex, useDiscoveryContext} from "@leight-core/leight";
import {DependencyList, PropsWithChildren, useEffect, useState} from "react";

export interface IDataContextProviderProps<TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any> {
	fetch: IQueryCallback<TItem, TQuery, TOrderBy, TFilter>;
	deps?: DependencyList;
	defaultSize?: number;
	defaultOrderBy?: TOrderBy | null;
	defaultFilter?: TFilter | null;
	defaultQuery?: TQuery;
}

export const DataContextProvider = <TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any>(
	{
		fetch,
		defaultSize = 10,
		defaultOrderBy,
		defaultFilter,
		defaultQuery,
		deps = [],
		children
	}: PropsWithChildren<IDataContextProviderProps<TItem, TQuery, TOrderBy, TFilter>>) => {
	const discoveryContext = useDiscoveryContext();
	const [page, setPage] = useState<number>(0);
	const [data, setData] = useState<IPageResponse<TItem>>(PageIndex());
	const [orderBy, setOrderBy] = useState<TOrderBy | null | undefined>(defaultOrderBy);
	const [filter, setFilter] = useState<TFilter | null | undefined>(defaultFilter);
	const [query, setQuery] = useState<TQuery | undefined>(defaultQuery);
	const [size, setSize] = useState<number>(defaultSize);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => fetch(
			{
				page,
				size,
				orderBy,
				filter,
			},
			discoveryContext,
			query,
		)
			.on("request", () => setLoading(true))
			.on("response", setData)
			.on("done", () => setLoading(false))
			.cleaner(),
		[orderBy, filter, page, query, size].concat(deps)
	);

	return <DataContext.Provider
		value={{
			page,
			setPage: (page, size) => {
				setPage(page);
				setSize(size || defaultSize);
			},
			size,
			setSize,
			data,
			setData,
			loading,
			setLoading,
			orderBy,
			setOrderBy,
			filter,
			setFilter,
			query,
			setQuery,
		}}
	>
		{children}
	</DataContext.Provider>;
};
