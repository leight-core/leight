import {List} from "antd";
import {ListProps} from "antd/lib/list";
import {ReactNode, useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAppContext} from "../app/AppContext";
import {OnFetchPageType} from "../server/createFetchPage";
import {Events} from "../utils/Events";
import {IPageIndex, PageIndex} from "../utils/PageIndex";

/**
 * Basic record must have an ID, thus all records must be extended from this type.
 */
export interface IRecordItem {
	id: string
}

export interface IBaseList<TItem extends IRecordItem> extends Partial<ListProps<TItem>> {
	onFetchPage: OnFetchPageType
	pageSize?: number
	children: (item: TItem, index: number) => ReactNode
}

export const BaseList = <TItem extends IRecordItem = any>(
	{
		onFetchPage,
		pageSize = 10,
		children,
		...props
	}: IBaseList<TItem>) => {
	const appContext = useAppContext();
	const params = useParams();
	const [page, setPage] = useState<IPageIndex>(PageIndex());
	const [loading, setLoading] = useState<boolean>(true);
	const items = page.items;

	const onPage = (page, size) => {
		setLoading(true);
		return onFetchPage(
			page,
			size,
			appContext,
			Events()
				.on<IPageIndex>("success", data => {
					setPage(data);
				})
				.on("done", () => {
					setLoading(false);
				}),
			params,
		);
	};

	/**
	 * Without dependency, because onPage is callback which changes overtime (thus forcing re-rendering).
	 */
	useEffect(() => {
		const cancelToken = onPage(0, pageSize);
		return () => cancelToken.cancel();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<List
			style={{minHeight: "50vh"}}
			dataSource={items}
			rowKey={record => record.id}
			loading={{
				spinning: loading,
				delay: 50,
			}}
			itemLayout={"horizontal"}
			size={"large"}
			pagination={{
				total: page.total,
				pageSize: page.size,
				defaultPageSize: page.size,
				showQuickJumper: true,
				hideOnSinglePage: true,
				onChange: (current, size) => onPage(current - 1, size),
			}}
			renderItem={children}
			{...props}
		/>
	);
};
