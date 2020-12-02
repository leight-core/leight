import {List} from "antd";
import {ListProps} from "antd/lib/list";
import {CancelTokenSource} from "axios";
import React, {FC, useEffect, useState} from "react";
import {Params, useParams} from "react-router";
import {IAppContext, useAppContext} from "../app/AppContext";
import {Events, IEvents} from "../utils/Events";
import {IPageIndex, PageIndex} from "../utils/PageIndex";

export interface IBaseList extends Partial<ListProps<any>> {
	onFetchPage: (page: number, size: number, params: Params, appContext: IAppContext, events: IEvents) => CancelTokenSource
	pageSize?: number
	children: (item: any, index: number) => React.ReactNode
}

export const BaseList: FC<IBaseList> = (
	{
		onFetchPage,
		pageSize = 10,
		children,
		...props
	}) => {
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
			params,
			appContext,
			Events()
				.on<IPageIndex>("success", data => {
					setPage(data);
				})
				.on("done", () => {
					setLoading(false);
				}),
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
