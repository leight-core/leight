import {IRecordItem, ITableChildrenCallback, LoaderIcon, useDataContext, useInterval} from "@leight-core/leight";
import {Table as CoolTable, TableProps} from "antd";
import {ColumnProps} from "antd/lib/table";
import isCallable from "is-callable";
import {DependencyList} from "react";
import {useTranslation} from "react-i18next";

export interface ITableProps<TItem extends Object> extends TableProps<TItem> {
	/**
	 * Enable live data fetching; live is number in milliseconds between fetches.
	 */
	live?: number;
	deps?: DependencyList;
	children: ITableChildrenCallback<TItem>;
}

export const Table = <TItem extends Object = IRecordItem>(
	{
		live,
		deps = [],
		children,
		...props
	}: ITableProps<TItem>) => {
	const {t} = useTranslation();
	const dataContext = useDataContext<TItem>();

	useInterval(() => dataContext.setPage(0, dataContext.size), live);

	return <CoolTable
		style={{minHeight: "50vh"}}
		dataSource={dataContext.data.items}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: dataContext.loading,
			indicator: <LoaderIcon/>,
			delay: 50,
		}}
		size={"large"}
		pagination={{
			total: dataContext.data.total,
			pageSize: dataContext.data.size,
			defaultPageSize: dataContext.data.size,
			showQuickJumper: true,
			hideOnSinglePage: true,
			onChange: (current, size) => dataContext.setPage(current - 1, size),
		}}
		onChange={(_, __, sorter: any) => {
			dataContext.setOrderBy(sorter.column === undefined ? undefined : {[sorter.columnKey]: sorter.order === "ascend"} as any);
		}}
		{...props}
	>
		{isCallable(children) ? (children as ITableChildrenCallback<TItem>)(props => {
			if (props.title) {
				props.title = t(props.title as string);
			}
			return <CoolTable.Column<TItem> {...(props as ColumnProps<TItem>)}/>;
		}) : children}
	</CoolTable>;
};
