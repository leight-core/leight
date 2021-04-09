import {ColumnProps} from "antd/lib/table";
import {ReactNode} from "react";

export interface IBaseTableChildrenCallback<TItem> {
	(column: (props: ColumnProps<TItem>) => ReactNode): ReactNode
}
