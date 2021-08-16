import {List, ListProps} from "antd";
import {DependencyList, ReactNode, useEffect, useState} from "react";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {LoaderIcon} from "../icon/LoaderIcon";
import {IPageCallback, IPageIndex, IRecordItem} from "../interface/interface";
import {IParams} from "../link/interface";
import {PageIndex} from "../utils/PageIndex";

export interface IBaseListProps<TItem extends IRecordItem> extends Partial<ListProps<TItem>> {
	onFetchPage: IPageCallback<TItem>;
	/**
	 * Optional parameter for the URL.
	 */
	onFetchParams?: IParams;
	/**
	 * Extra parameters for the Paging.
	 */
	onPageParams?: any;
	pageSize?: number;
	children: (item: TItem, index: number) => ReactNode;
	deps?: DependencyList;
}

export const BaseList = <TItem extends IRecordItem = any>(
	{
		onFetchPage,
		onFetchParams,
		onPageParams,
		pageSize = 10,
		deps = [],
		children,
		...props
	}: IBaseListProps<TItem>) => {
	const discoveryContext = useDiscoveryContext();
	const [page, setPage] = useState<IPageIndex<TItem>>(PageIndex());
	const [loading, setLoading] = useState<boolean>(true);
	const items = page.items;

	const onPage = (page: number, size: number | undefined) => {
		setLoading(true);
		return onFetchPage(
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
	useEffect(() => onPage(0, pageSize).cleaner(), deps);

	return <List
		style={{minHeight: "50vh"}}
		dataSource={items}
		rowKey={record => record.id}
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
