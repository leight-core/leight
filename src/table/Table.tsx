import {IndexOf, IQueryParams, IRecordItem, isArray, isCallable, ISourceContext, ITableChildrenCallback, LoaderIcon, useSourceContext} from "@leight-core/leight";
import {Empty, Table as CoolTable, TablePaginationConfig, TableProps} from "antd";
import {FilterValue, SorterResult} from "antd/lib/table/interface";
import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ITableProps<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> extends TableProps<TResponse> {
	header?: (sourceContext: ISourceContext<TQuery, TResponse, TOrderBy, TFilter>) => ReactNode;
	children?: ITableChildrenCallback<TQuery, TResponse, TOrderBy, TFilter> | ReactNode;
	toFilter?: (filters: Record<keyof TResponse, FilterValue | null>) => TFilter | null;
}

export const Table = <TQuery extends IQueryParams, TResponse extends object, TOrderBy, TFilter>(
	{
		children,
		header,
		toFilter = () => null,
		...props
	}: ITableProps<TQuery, TResponse, TOrderBy, TFilter>) => {
	const {t} = useTranslation();
	const sourceContext = useSourceContext<TQuery, TResponse, TOrderBy, TFilter>();
	if (header && !props.title) {
		props.title = () => header(sourceContext);
	}
	return <CoolTable
		style={{minHeight: "50vh"}}
		dataSource={sourceContext.result.isSuccess ? sourceContext.result.data.items : []}
		rowKey={((record: IRecordItem) => record.id) as any}
		loading={{
			spinning: sourceContext.result.isLoading,
			indicator: <LoaderIcon/>,
			delay: 100,
		}}
		size={"large"}
		locale={{emptyText: <Empty description={t("common.nothing-found")}/>}}
		pagination={sourceContext.pagination()}
		onChange={((pagination: TablePaginationConfig, filters: Record<keyof TResponse, FilterValue | null>, sorter: SorterResult<TResponse> | SorterResult<TResponse>[]) => {
			const orderBy: IndexOf<any> = {};
			((isArray(sorter) ? sorter : [sorter]) as SorterResult<TResponse>[]).forEach(sorter => {
				orderBy[sorter.columnKey as string] = (sorter.column === undefined ? undefined : sorter.order === "ascend") as any;
			});
			sourceContext.setOrderBy(orderBy as TOrderBy);
			sourceContext.setFilter(toFilter(filters));
		}) as any}
		{...props}
	>
		{isCallable(children) ? (children as ITableChildrenCallback<TQuery, TResponse, TOrderBy, TFilter>)({
			column: (props: any) => {
				if (props.title) {
					props.title = t(props.title as string);
				}
				return <CoolTable.Column {...props}/>;
			},
			sourceContext,
		}) : children}
	</CoolTable>;
};
