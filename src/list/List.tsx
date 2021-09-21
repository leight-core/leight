import {IRecordItem, LoaderIcon, useSourceContext} from "@leight-core/leight";
import {List as CoolList, ListProps} from "antd";
import {ReactNode} from "react";

export interface IListProps<TItem> extends Partial<ListProps<TItem>> {
	children: (item: TItem, index: number) => ReactNode;
}

export const List = <TItem extends Object = IRecordItem>(
	{
		children,
		...props
	}: IListProps<TItem>) => {
	const sourceContext = useSourceContext();
	return <CoolList
		style={{minHeight: "50vh"}}
		dataSource={sourceContext.result.isSuccess ? sourceContext.result.data.items : []}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: sourceContext.result.isLoading,
			indicator: <LoaderIcon/>,
			delay: 50,
		}}
		itemLayout={"horizontal"}
		size={"large"}
		pagination={sourceContext.result.isSuccess ? {
			total: sourceContext.result.data.total,
			pageSize: sourceContext.result.data.size,
			defaultPageSize: sourceContext.result.data.size,
			showQuickJumper: true,
			hideOnSinglePage: true,
			onChange: (current, size) => sourceContext.setPage(current - 1, size),
		} : undefined}
		renderItem={children}
		{...props}
	/>;
};
