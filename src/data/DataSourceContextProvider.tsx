import {DataSourceContext, IPageCallback, IPageResponse, IParams, IQuery, PageIndex, useDiscoveryContext} from "@leight-core/leight";
import {PropsWithChildren, useState} from "react";

export interface IDataSourceContextProviderProps<TItem> {
	fetch: IPageCallback<TItem>;
}

export const DataSourceContextProvider = <TItem, >({fetch, children}: PropsWithChildren<IDataSourceContextProviderProps<TItem>>) => {
	const discoveryContext = useDiscoveryContext();
	const [data, setData] = useState<IPageResponse<TItem>>(PageIndex());
	const [params, setParams] = useState<IParams>();
	const [query, setQuery] = useState<IQuery>();
	const [size, setSize] = useState<number>(10);
	const [loading, setLoading] = useState<boolean>(false);
	return <DataSourceContext.Provider
		value={{
			page: (page: number, pageSize: number | undefined = size) => {
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
			},
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
