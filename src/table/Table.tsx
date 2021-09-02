import {IRecordItem, ITableChildrenCallback, LoaderIcon, useDataSourceContext, useInterval} from "@leight-core/leight";
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
	const dataSourceContext = useDataSourceContext<TItem>();

	useInterval(() => dataSourceContext.page(0, dataSourceContext.size), live);

	return <CoolTable
		style={{minHeight: "50vh"}}
		dataSource={dataSourceContext.data.items}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: dataSourceContext.loading,
			indicator: <LoaderIcon/>,
			delay: 50,
		}}
		size={"large"}
		pagination={{
			total: dataSourceContext.data.total,
			pageSize: dataSourceContext.data.size,
			defaultPageSize: dataSourceContext.data.size,
			showQuickJumper: true,
			hideOnSinglePage: true,
			onChange: (current, size) => {
				size && dataSourceContext.setSize(size);
				dataSourceContext.page(current - 1, size);
			},
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
