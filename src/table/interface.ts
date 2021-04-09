import {ColumnProps} from "antd/lib/table";
import {ReactNode} from "react";

export interface IBaseTableColumnProps<TItem> extends Omit<ColumnProps<TItem>, "dataIndex"> {
	dataIndex?: keyof TItem
}

export interface IBaseTableChildrenCallback<TItem> {
	(column: (props: IBaseTableColumnProps<TItem>) => ReactNode): ReactNode
}
