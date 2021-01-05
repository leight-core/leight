import {Table} from "antd";
import {TableProps} from "antd/lib/table";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAppContext} from "../app/AppContext";
import {IPageIndex, IRecordItem} from "../interface/interface";
import {IOnFetchPage} from "../server/interface";
import {Events} from "../utils/Events";
import {PageIndex} from "../utils/PageIndex";

export interface IBaseTableProps<TItem extends IRecordItem> extends TableProps<TItem> {
	onFetchPage: IOnFetchPage
	pageSize?: number
}

export const BaseTable = <TItem extends IRecordItem = any>(
	{
		onFetchPage,
		pageSize = 10,
		...props
	}: IBaseTableProps<TItem>) => {
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
		<Table
			style={{minHeight: "50vh"}}
			dataSource={items}
			rowKey={record => record.id}
			loading={{
				spinning: loading,
				delay: 50,
			}}
			size={"large"}
			pagination={{
				total: page.total,
				pageSize: page.size,
				defaultPageSize: page.size,
				showQuickJumper: true,
				hideOnSinglePage: true,
				onChange: (current, size) => onPage(current - 1, size),
			}}
			{...props}
		/>
	);
};
