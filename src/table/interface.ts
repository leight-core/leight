import {ColumnProps} from "antd/lib/table";
import {ReactNode} from "react";
import {IQueryParams, ISourceContext} from "../query";

export interface ITableColumnProps<TItem> extends Omit<ColumnProps<TItem>, "dataIndex"> {
	dataIndex?: keyof TItem;
}

export interface IITableChildren<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> {
	column: (props: ITableColumnProps<TResponse>) => ReactNode;
	sourceContext: ISourceContext<TQuery, TResponse, TOrderBy, TFilter>;
}

export interface ITableChildrenCallback<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> {
	(children: IITableChildren<TQuery, TResponse, TOrderBy, TFilter>): ReactNode;
}
