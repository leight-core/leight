import {ColumnProps} from "antd/lib/table";
import {ReactNode} from "react";

export interface ITableColumnProps<TItem> extends Omit<ColumnProps<TItem>, "dataIndex"> {
	dataIndex?: keyof TItem;
}

export interface ITableChildrenCallback<TItem> {
	(column: (props: ITableColumnProps<TItem>) => ReactNode): ReactNode;
}
