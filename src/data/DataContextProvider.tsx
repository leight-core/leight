import {DataContext, IPageResponse, IQueryParams, PageIndex} from "@leight-core/leight";
import {DependencyList, PropsWithChildren, useState} from "react";

export interface IDataContextProviderProps<TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any> {
	deps?: DependencyList;
	defaultSize?: number;
	defaultOrderBy?: TOrderBy | null;
	defaultFilter?: TFilter | null;
	defaultQuery?: TQuery;
}

export const DataContextProvider = <TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any>(
	{
		defaultSize = 10,
		defaultOrderBy,
		defaultFilter,
		defaultQuery,
		children
	}: PropsWithChildren<IDataContextProviderProps<TItem, TQuery, TOrderBy, TFilter>>) => {
	const [page, setPage] = useState<number>(0);
	const [data, setData] = useState<IPageResponse<TItem>>(PageIndex());
	const [orderBy, setOrderBy] = useState<TOrderBy | null | undefined>(defaultOrderBy);
	const [filter, setFilter] = useState<TFilter | null | undefined>(defaultFilter);
	const [query, setQuery] = useState<TQuery | undefined>(defaultQuery);
	const [size, setSize] = useState<number>(defaultSize);
	const [loading, setLoading] = useState<boolean>(true);

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
