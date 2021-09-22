import {IRecordItem, isCallable, ITableChildrenCallback, LoaderIcon, useSourceContext} from "@leight-core/leight";
import {Table as CoolTable, TableProps} from "antd";
import {ColumnProps} from "antd/lib/table";
import {useTranslation} from "react-i18next";

export interface ITableProps<TItem extends Object> extends TableProps<TItem> {
	children?: ITableChildrenCallback<TItem>;
}

export const Table = <TItem extends Object = IRecordItem>(
	{
		children,
		...props
	}: ITableProps<TItem>) => {
	const {t} = useTranslation();
	const sourceContext = useSourceContext<any, TItem, any, any>();
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
		{isCallable(children) ? (children as ITableChildrenCallback<TItem>)(props => {
			if (props.title) {
				props.title = t(props.title as string);
			}
			return <CoolTable.Column<TItem> {...(props as ColumnProps<TItem>)}/>;
		}) : children}
	</CoolTable>;
};
