import {IQueryParams, IRecordItem, isCallable, ISourceContext, ITableChildrenCallback, LoaderIcon, useSourceContext} from "@leight-core/leight";
import {Table as CoolTable, TableProps} from "antd";
import {ColumnProps} from "antd/lib/table";
import {ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface ITableProps<TQuery extends IQueryParams, TResponse extends IRecordItem, TOrderBy, TFilter> extends TableProps<TResponse> {
	header?: (sourceContext: ISourceContext<TQuery, TResponse, TOrderBy, TFilter>) => ReactNode;
	children?: ITableChildrenCallback<TResponse> | ReactNode;
}

export const Table = <TQuery extends IQueryParams, TResponse extends IRecordItem, TOrderBy, TFilter>(
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
		dataSource={sourceContext.result.isSuccess ? sourceContext.result.data.items : []}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: sourceContext.result.isLoading,
			indicator: <LoaderIcon/>,
			delay: 100,
		}}
		size={"large"}
		pagination={sourceContext.pagination()}
		onChange={(_, __, sorter: any) => {
			sourceContext.setOrderBy(sorter.column === undefined ? undefined : {[sorter.columnKey]: sorter.order === "ascend"} as any);
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
