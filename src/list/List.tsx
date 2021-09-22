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
	const sourceContext = useSourceContext<any, TItem, any, any>();
	return <CoolList
		style={{minHeight: "50vh"}}
		dataSource={sourceContext.result.isSuccess ? sourceContext.result.data.items : []}
		rowKey={(record: any) => record.id}
		loading={{
			spinning: sourceContext.result.isFetching,
			indicator: <LoaderIcon/>,
			delay: 150,
		}}
		itemLayout={"horizontal"}
		size={"large"}
		pagination={sourceContext.pagination()}
		renderItem={children}
		{...props}
	/>;
};
