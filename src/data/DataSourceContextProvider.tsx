import {DataSourceContext, IPageCallback, IPageResponse, IParams, IQuery, PageIndex, useDiscoveryContext} from "@leight-core/leight";
import {DependencyList, PropsWithChildren, useEffect, useState} from "react";

export interface IDataSourceContextProviderProps<TItem> {
	fetch: IPageCallback<TItem>;
	deps?: DependencyList;
	defaultSize?: number;
}

export const DataSourceContextProvider = <TItem, >({fetch, defaultSize = 10, deps = [], children}: PropsWithChildren<IDataSourceContextProviderProps<TItem>>) => {
	const discoveryContext = useDiscoveryContext();
	const [data, setData] = useState<IPageResponse<TItem>>(PageIndex());
	const [params, setParams] = useState<IParams>();
	const [query, setQuery] = useState<IQuery>();
	const [size, setSize] = useState<number>(defaultSize);
	const [loading, setLoading] = useState<boolean>(true);

	function doFetchPage(page: number, pageSize: number | undefined = size) {
		setLoading(true);
		return fetch(
			{
				page,
				size: pageSize,
				params,
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
			params,
			setParams,
			query,
			setQuery,
		}}
	>
		{children}
	</DataSourceContext.Provider>;
};
