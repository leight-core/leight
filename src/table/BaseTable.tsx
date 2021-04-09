import {Table, TableProps} from "antd";
import isCallable from "is-callable";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IPageIndex, IParams, IRecordItem} from "../interface/interface";
import {IOnFetchPage} from "../server/interface";
import {PageIndex} from "../utils/PageIndex";
import {useInterval} from "../utils/useInterval";
import {IBaseTableChildrenCallback} from "./interface";

export interface IBaseTableProps<TItem extends IRecordItem> extends TableProps<TItem> {
	/**
	 * Callback for getting page for the table.
	 */
	onFetchPage: IOnFetchPage
	/**
	 * Optional parameter for the URL.
	 */
	onFetchParams?: IParams
	/**
	 * Extra parameters for the Paging.
	 */
	onPageParams?: any
	pageSize?: number
	/**
	 * Enable live data fetching; live is number in milliseconds between fetches.
	 */
	live?: number
	deps?: any[]
	children: IBaseTableChildrenCallback<TItem>
}

export const BaseTable = <TItem extends IRecordItem = any>(
	{
		onFetchPage,
		onFetchParams,
		onPageParams,
		pageSize = 10,
		live,
		deps = [],
		children,
		...props
	}: IBaseTableProps<TItem>) => {
	const discoveryContext = useDiscoveryContext();
	const params = useParams();
	const [page, setPage] = useState<IPageIndex>(PageIndex());
	const [loading, setLoading] = useState<boolean>(true);
	const items = page.items;

	const onPage = (page, size) => {
		setLoading(true);
		return onFetchPage(
			page,
			size,
			discoveryContext,
			{...params, ...onFetchParams},
			onPageParams,
		)
			.on("response", data => setPage(data))
			.on("done", () => setLoading(false));
	};

	/**
	 * Without dependency, because onPage is callback which changes overtime (thus forcing re-rendering).
	 */
	useEffect(() => onPage(0, pageSize).cleaner(), deps);

	useInterval(() => onPage(0, pageSize), live);

	return (
		<Table
			style={{minHeight: "50vh"}}
			dataSource={items}
			rowKey={record => record.id}
			loading={{
				spinning: loading,
				delay: 50,
			}}
			size={"large"}
			pagination={{
				total: page.total,
				pageSize: page.size,
				defaultPageSize: page.size,
				showQuickJumper: true,
				hideOnSinglePage: true,
				onChange: (current, size) => onPage(current - 1, size),
			}}
			children={isCallable(children) ? (children as IBaseTableChildrenCallback<TItem>)(props => <Table.Column<TItem> {...props}/>) : children}
			{...props}
		/>
	);
};
