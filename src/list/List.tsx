import {IRecordItem, LoaderIcon, useDataContext} from "@leight-core/leight";
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
	const dataContext = useDataContext<TItem>();
	return <CoolList
		style={{minHeight: "50vh"}}
		dataSource={dataContext.data.items}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: dataContext.loading,
			indicator: <LoaderIcon/>,
			delay: 50,
		}}
		itemLayout={"horizontal"}
		size={"large"}
		pagination={{
			total: dataContext.data.total,
			pageSize: dataContext.data.size,
			defaultPageSize: dataContext.data.size,
			showQuickJumper: true,
			hideOnSinglePage: true,
			onChange: (current, size) => dataContext.setPage(current - 1, size),
		}}
		renderItem={children}
		{...props}
	/>;
};
