import {DataSourceContext, IPageCallback, IPageResponse, IQuery, PageIndex, useDiscoveryContext} from "@leight-core/leight";
import {DependencyList, PropsWithChildren, useEffect, useState} from "react";

export interface IDataSourceContextProviderProps<TItem, TOrderBy = never> {
	fetch: IPageCallback<TItem, TOrderBy>;
	deps?: DependencyList;
	defaultSize?: number;
	defaultOrderBy?: TOrderBy | null;
	defaultQuery?: IQuery;
}

export const DataSourceContextProvider = <TItem, TOrderBy = never>({fetch, defaultSize = 10, defaultOrderBy, defaultQuery, deps = [], children}: PropsWithChildren<IDataSourceContextProviderProps<TItem, TOrderBy>>) => {
	const discoveryContext = useDiscoveryContext();
	const [page, setPage] = useState<number>(0);
	const [data, setData] = useState<IPageResponse<TItem>>(PageIndex());
	const [orderBy, setOrderBy] = useState<TOrderBy | null | undefined>(defaultOrderBy);
	const [query, setQuery] = useState<IQuery>(defaultQuery);
	const [size, setSize] = useState<number>(defaultSize);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => fetch(
			{
				page,
				size,
				orderBy,
			},
			discoveryContext,
			query,
		)
			.on("response", setData)
			.on("done", () => setLoading(false))
			.cleaner(),
		[orderBy, page, query, size].concat(deps)
	);

	return <DataSourceContext.Provider
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
			query,
			setQuery,
		}}
	>
		{children}
	</DataSourceContext.Provider>;
};
