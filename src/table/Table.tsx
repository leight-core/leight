import {IndexOf, IQueryParams, IRecordItem, isArray, isCallable, ISourceContext, isString, ITableChildrenCallback, ITableToFilterCallback, LoaderIcon, merge, useIsMobile, useSourceContext} from "@leight-core/leight";
import {Empty, List, ListProps, Table as CoolTable, TablePaginationConfig, TableProps} from "antd";
import {FilterValue, SorterResult} from "antd/lib/table/interface";
import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ITableProps<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> extends Omit<TableProps<TResponse>, "header" | "footer" | "children"> {
	header?: (sourceContext: ISourceContext<TQuery, TResponse, TOrderBy, TFilter>) => ReactNode;
	footer?: (sourceContext: ISourceContext<TQuery, TResponse, TOrderBy, TFilter>) => ReactNode;
	children?: ITableChildrenCallback<TQuery, TResponse, TOrderBy, TFilter> | ReactNode;
	toFilter?: ITableToFilterCallback<TResponse, TFilter>;
	listItemRender?: (item: TResponse) => ReactNode;
	listProps?: ListProps<TResponse>;
	forceList?: boolean;
}

export const Table = <TQuery extends IQueryParams, TResponse extends object, TOrderBy, TFilter>(
	{
		children,
		header,
		footer,
		forceList = false,
		toFilter = () => null,
		listItemRender,
		listProps,
		...props
	}: ITableProps<TQuery, TResponse, TOrderBy, TFilter>) => {
	const {t} = useTranslation();
	const isMobile = useIsMobile();
	const sourceContext = useSourceContext<TQuery, TResponse, TOrderBy, TFilter>();
	if (header && !props.title) {
		props.title = () => header(sourceContext);
	}
	return (!isMobile && !forceList) ? <CoolTable
			style={{minHeight: "50vh"}}
			showSorterTooltip={false}
			dataSource={sourceContext.result.isSuccess ? sourceContext.result.data.items : []}
			rowKey={((record: IRecordItem) => record.id) as any}
			loading={{
				spinning: sourceContext.result.isFetching,
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
				sourceContext.setFilter(merge<TFilter, TFilter>(sourceContext.filter || {}, toFilter({filters, current: sourceContext.filter}) || {}));
			}) as any}
			footer={() => footer?.(sourceContext)}
			{...props}
		>
			{isCallable(children) ? (children as ITableChildrenCallback<TQuery, TResponse, TOrderBy, TFilter>)({
				column: (props: any) => {
					if (isString(props.title)) {
						props.title = t(props.title as string);
					}
					return <CoolTable.Column {...props}/>;
				},
				sourceContext,
			}) : children as any}
		</CoolTable> :
		<List
			header={header?.(sourceContext)}
			footer={footer?.(sourceContext)}
			dataSource={sourceContext.result.isSuccess ? sourceContext.result.data.items : []}
			rowKey={((record: IRecordItem) => record.id) as any}
			loading={{
				spinning: sourceContext.result.isLoading,
				indicator: <LoaderIcon/>,
				delay: 50,
			}}
			renderItem={listItemRender}
			pagination={sourceContext.pagination()}
			{...listProps}
		/>;
};
