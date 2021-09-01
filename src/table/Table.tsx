import {IBaseTableChildrenCallback, IPageCallback, IPageResponse, IQuery, IRecordItem, LoaderIcon, PageIndex, useDiscoveryContext, useInterval} from "@leight-core/leight";
import {Table as CoolTable, TableProps} from "antd";
import {ColumnProps} from "antd/lib/table";
import isCallable from "is-callable";
import {DependencyList, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export interface ITableProps<TItem extends Object> extends TableProps<TItem> {
	/**
	 * Callback for getting page for the table.
	 */
	onFetchPage: IPageCallback<TItem>;
	/**
	 * Optional parameter for the URL.
	 */
	onFetchParams?: IQuery;
	/**
	 * Extra parameters for the Paging.
	 */
	onPageParams?: any;
	pageSize?: number;
	/**
	 * Enable live data fetching; live is number in milliseconds between fetches.
	 */
	live?: number;
	deps?: DependencyList;
	children: IBaseTableChildrenCallback<TItem>;
}

export const Table = <TItem extends Object = IRecordItem>(
	{
		onFetchPage,
		onFetchParams,
		onPageParams,
		pageSize = 10,
		live,
		deps = [],
		children,
		...props
	}: ITableProps<TItem>) => {
	const {t} = useTranslation();
	const discoveryContext = useDiscoveryContext();
	const [page, setPage] = useState<IPageResponse<TItem>>(PageIndex());
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

	return <CoolTable
		style={{minHeight: "50vh"}}
		dataSource={items}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: loading,
			indicator: <LoaderIcon/>,
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
		{...props}
	>
		{isCallable(children) ? (children as IBaseTableChildrenCallback<TItem>)(props => {
			if (props.title) {
				props.title = t(props.title as string);
			}
			return <CoolTable.Column<TItem> {...(props as ColumnProps<TItem>)}/>;
		}) : children}
	</CoolTable>;
};
