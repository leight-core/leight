import {Table, TableProps} from "antd";
import {ColumnProps} from "antd/lib/table";
import isCallable from "is-callable";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IPageCallback, IPageIndex, IRecordItem} from "../interface/interface";
import {IParams} from "../link/interface";
import {PageIndex} from "../utils/PageIndex";
import {useInterval} from "../utils/useInterval";
import {IBaseTableChildrenCallback} from "./interface";

export interface IBaseTableProps<TItem extends IRecordItem> extends TableProps<TItem> {
	/**
	 * Callback for getting page for the table.
	 */
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
	/**
	 * Enable live data fetching; live is number in milliseconds between fetches.
	 */
	live?: number;
	deps?: any[];
	children: IBaseTableChildrenCallback<TItem>;
}

export const BaseTable = <TItem extends IRecordItem>(
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
	const {t} = useTranslation();
	const discoveryContext = useDiscoveryContext();
	const [page, setPage] = useState<IPageIndex<TItem>>(PageIndex());
	const [loading, setLoading] = useState<boolean>(true);
	const items = page.items;

	const onPage = (page: number, size: number) => {
		setLoading(true);
		return onFetchPage(
			{
				page,
				size,
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
				onChange: (current, size) => onPage(current - 1, size || 10),
			}}
			children={isCallable(children) ? (children as IBaseTableChildrenCallback<TItem>)(props => {
				if (props.title) {
					props.title = t(props.title as string);
				}
				return <Table.Column<TItem> {...(props as ColumnProps<TItem>)}/>;
			}) : children}
			{...props}
		/>
	);
};
