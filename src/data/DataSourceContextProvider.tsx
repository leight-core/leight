import {DataSourceContext, IPageCallback, IPageResponse, PageIndex, useDiscoveryContext} from "@leight-core/leight";
import {PropsWithChildren, useState} from "react";

export interface IDataSourceContextProviderProps<TItem> {
	fetch: IPageCallback<TItem>;
}

export const DataSourceContextProvider = <TItem, >({fetch, children}: PropsWithChildren<IDataSourceContextProviderProps<TItem>>) => {
	const discoveryContext = useDiscoveryContext();
	const [data, setData] = useState<IPageResponse<any>>(PageIndex());
	const [loading, setLoading] = useState<boolean>(false);
	return <DataSourceContext.Provider
		value={{
			page: (page: number, size: number | undefined) => {
				setLoading(true);
				return fetch(
					{
						page,
						size: size || 10,
						params: onPageParams,
					},
					discoveryContext,
					{...onFetchParams},
				)
					.on("response", setData)
					.on("done", () => setLoading(false));
			},
			data,
			setData,
			loading,
			setLoading,
		}}
	>
		{children}
	</DataSourceContext.Provider>;
};
