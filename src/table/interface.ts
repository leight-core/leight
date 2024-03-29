import {IQueryParams, ISourceContext} from "@leight-core/leight";
import {ColumnProps} from "antd/lib/table";
import {FilterValue} from "antd/lib/table/interface";
import {ReactNode} from "react";

export interface ITableColumnProps<TItem> extends Omit<ColumnProps<TItem>, "dataIndex"> {
	readonly dataIndex?: keyof TItem;
}

export interface IITableChildren<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> {
	column(props: ITableColumnProps<TResponse>): ReactNode;

	readonly sourceContext: ISourceContext<TQuery, TResponse, TOrderBy, TFilter>;
}

export interface ITableChildrenCallback<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> {
	(children: IITableChildren<TQuery, TResponse, TOrderBy, TFilter>): ReactNode;
}

export interface ITableToFilter<TResponse, TFilter> {
	readonly filters: Record<keyof TResponse, FilterValue | null>;
	readonly current?: TFilter | null;
}

export interface ITableToFilterCallback<TResponse, TFilter> {
	(filters: ITableToFilter<TResponse, TFilter>): TFilter | null;
}
