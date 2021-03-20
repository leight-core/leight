import {List, ListProps} from "antd";
import {ReactNode, useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IPageIndex, IRecordItem} from "../interface/interface";
import {IOnFetchPage} from "../server/interface";
import {PageIndex} from "../utils/PageIndex";

export interface IBaseListProps<TItem extends IRecordItem> extends Partial<ListProps<TItem>> {
	onFetchPage: IOnFetchPage<TItem>
	pageSize?: number
	children: (item: TItem, index: number) => ReactNode
}

export const BaseList = <TItem extends IRecordItem = any>(
	{
		onFetchPage,
		pageSize = 10,
		children,
		...props
	}: IBaseListProps<TItem>) => {
	const discoveryContext = useDiscoveryContext();
	const params = useParams();
	const [page, setPage] = useState<IPageIndex<TItem>>(PageIndex());
	const [loading, setLoading] = useState<boolean>(true);
	const items = page.items;

	const onPage = (page, size) => {
		setLoading(true);
		return onFetchPage(page, size, discoveryContext, params)
			.on("response", data => setPage(data))
			.on("done", () => setLoading(false));
	};

	/**
	 * Without dependency, because onPage is callback which changes overtime (thus forcing re-rendering).
	 */
	useEffect(() => {
		const events = onPage(0, pageSize);
		return () => events.dismiss();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<List
			style={{minHeight: "50vh"}}
			dataSource={items}
			rowKey={record => record.id}
			loading={{
				spinning: loading,
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
		/>
	);
};
