import {IRecordItem, LoaderIcon, useDataSourceContext} from "@leight-core/leight";
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
	const dataSourceContext = useDataSourceContext<TItem>();
	// useEffect(() => onPage(0, dataSourceContext.size).cleaner(), deps);

	return <CoolList
		style={{minHeight: "50vh"}}
		dataSource={dataSourceContext.data.items}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: dataSourceContext.loading,
			indicator: <LoaderIcon/>,
			delay: 50,
		}}
		itemLayout={"horizontal"}
		size={"large"}
		pagination={{
			total: dataSourceContext.data.total,
			pageSize: dataSourceContext.data.size,
			defaultPageSize: dataSourceContext.data.size,
			showQuickJumper: true,
			hideOnSinglePage: true,
			onChange: (current, size) => dataSourceContext.page(current - 1, size),
		}}
		renderItem={children}
		{...props}
	/>;
};
