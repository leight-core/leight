import {DataSourceContext, IPageCallback, IPageResponse, IQuery, PageIndex, useDiscoveryContext} from "@leight-core/leight";
import {DependencyList, PropsWithChildren, useEffect, useState} from "react";

export interface IDataSourceContextProviderProps<TItem, TOrderBy = never> {
	fetch: IPageCallback<TItem, TOrderBy>;
	deps?: DependencyList;
	defaultSize?: number;
}

export const DataSourceContextProvider = <TItem, TOrderBy = never>({fetch, defaultSize = 10, deps = [], children}: PropsWithChildren<IDataSourceContextProviderProps<TItem, TOrderBy>>) => {
	const discoveryContext = useDiscoveryContext();
	const [data, setData] = useState<IPageResponse<TItem>>(PageIndex());
	const [orderBy, setOrderBy] = useState<TOrderBy | null | undefined>();
	const [query, setQuery] = useState<IQuery>();
	const [size, setSize] = useState<number>(defaultSize);
	const [loading, setLoading] = useState<boolean>(true);

	function doFetchPage(page: number, pageSize: number | undefined = size) {
		setLoading(true);
		return fetch(
			{
				page,
				size: pageSize,
				orderBy,
			},
			discoveryContext,
			query,
		)
			.on("response", setData)
			.on("done", () => setLoading(false));
	}

	useEffect(() => doFetchPage(0, size).cleaner(), deps);

	return <DataSourceContext.Provider
		value={{
			page: doFetchPage,
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
