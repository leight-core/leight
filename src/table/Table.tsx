import {IQueryParams, isArray, isCallable, ISourceContext, ITableChildrenCallback, LoaderIcon, useSourceContext} from "@leight-core/leight";
import {Empty, Table as CoolTable, TablePaginationConfig, TableProps} from "antd";
import {ColumnProps} from "antd/lib/table";
import {FilterValue, SorterResult} from "antd/lib/table/interface";
import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ITableProps<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> extends TableProps<any> {
	header?: (sourceContext: ISourceContext<TQuery, TResponse, TOrderBy, TFilter>) => ReactNode;
	children?: ITableChildrenCallback<TResponse> | ReactNode;
}

export const Table = <TQuery extends IQueryParams, TResponse, TOrderBy, TFilter>(
	{
		children,
		header,
		...props
	}: ITableProps<TQuery, TResponse, TOrderBy, TFilter>) => {
	const {t} = useTranslation();
	const sourceContext = useSourceContext<TQuery, TResponse, TOrderBy, TFilter>();
	if (header && !props.title) {
		props.title = () => header(sourceContext);
	}
	return <CoolTable
		style={{minHeight: "50vh"}}
		dataSource={sourceContext.result.isSuccess ? sourceContext.result.data.items : [] as any[]}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: sourceContext.result.isLoading,
			indicator: <LoaderIcon/>,
			delay: 100,
		}}
		size={"large"}
		locale={{emptyText: <Empty description={t("common.nothing-found")}/>}}
		pagination={sourceContext.pagination()}
		onChange={(pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[]) => {
			const orderBy: { [index: string]: any } = {};
			((isArray(sorter) ? sorter : [sorter]) as SorterResult<any>[]).forEach(sorter => {
				orderBy[sorter.columnKey as string] = (sorter.column === undefined ? undefined : sorter.order === "ascend") as any;
			});
			sourceContext.setOrderBy(orderBy as TOrderBy);
		}}
		{...props}
	>
		{isCallable(children) ? (children as ITableChildrenCallback<TResponse>)(props => {
			if (props.title) {
				props.title = t(props.title as string);
			}
			return <CoolTable.Column<TResponse> {...(props as ColumnProps<TResponse>)}/>;
		}) : children}
	</CoolTable>;
};
