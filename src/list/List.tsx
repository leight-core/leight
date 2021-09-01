import {IRecordItem, LoaderIcon, useDataSourceContext, useDiscoveryContext} from "@leight-core/leight";
import {List as CoolList, ListProps} from "antd";
import {DependencyList, ReactNode, useEffect} from "react";

export interface IListProps<TItem> extends Partial<ListProps<TItem>> {
	children: (item: TItem, index: number) => ReactNode;
	deps?: DependencyList;
}

export const List = <TItem extends Object = IRecordItem>(
	{
		deps = [],
		children,
		...props
	}: IListProps<TItem>) => {
	const discoveryContext = useDiscoveryContext();
	const dataSourceContext = useDataSourceContext();

	const onPage = (page: number, size: number | undefined) => {
		setLoading(true);
		return dataSourceContext.page(
			{
				page,
				size: size || 10,
				params: onPageParams,
			},
			discoveryContext,
			{...onFetchParams},
		)
			.on("response", data => setPage(data))
			.on("done", () => setLoading(false));
	};

	/**
	 * Without dependency, because onPage is callback which changes overtime (thus forcing re-rendering).
	 */
	useEffect(() => onPage(0, dataSourceContext.size).cleaner(), deps);

	return <CoolList
		style={{minHeight: "50vh"}}
		dataSource={items}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: loading,
			indicator: <LoaderIcon/>,
			delay: 50,
		}}
		itemLayout={"horizontal"}
		size={"large"}
		pagination={{
			total: page.total,
			pageSize: page.size,
			defaultPageSize: page.size,
			showQuickJumper: true,
			hideOnSinglePage: true,
			onChange: (current, size) => onPage(current - 1, size),
		}}
		renderItem={children}
		{...props}
	/>;
};
