import {Table, TableProps} from "antd";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {useAppContext} from "../app/AppContext";
import {IPageIndex, IRecordItem} from "../interface/interface";
import {IOnFetchPage} from "../server/interface";
import {PageIndex} from "../utils/PageIndex";

export interface IBaseTableProps<TItem extends IRecordItem> extends TableProps<TItem> {
	onFetchPage: IOnFetchPage
	pageSize?: number
	deps?: any[]
}

export const BaseTable = <TItem extends IRecordItem = any>(
	{
		onFetchPage,
		pageSize = 10,
		deps = [],
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
			params,
		)
			.on("response", data => setPage(data))
			.on("done", () => setLoading(false));
	};

	/**
	 * Without dependency, because onPage is callback which changes overtime (thus forcing re-rendering).
	 */
	useEffect(() => {
		const events = onPage(0, pageSize);
		return () => events.dismiss();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

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
