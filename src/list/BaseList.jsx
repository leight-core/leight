import { List } from "antd";
import PropTypes from "prop-types";
import {
	useEffect,
	useState
} from "react";
import { useParams } from "react-router";
import useDiscoveryContext from "../discovery/useDiscoveryContext";
import PageIndex from "../utils/PageIndex";

const BaseList = (
	{
		onFetchPage,
		children,
		pageSize = 10,
		...props
	}) => {
	const discoveryContext      = useDiscoveryContext();
	const params                = useParams();
	const [page, setPage]       = useState(PageIndex());
	const [loading, setLoading] = useState(true);
	const items                 = page.items;

	const onPage = (page, size) => {
		setLoading(true);
		return onFetchPage(
			discoveryContext,
			page,
			size,
			params,
			Events()
				.on("success", data => {
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
				delay:    50,
			}}
			itemLayout={"horizontal"}
			size={"large"}
			pagination={{
				total:            page.total,
				pageSize:         page.size,
				defaultPageSize:  page.size,
				showQuickJumper:  true,
				hideOnSinglePage: true,
				onChange:         (current, size) => onPage(current - 1, size),
			}}
			renderItem={children}
			{...props}
		/>
	);
};

BaseList.propTypes = {
	children:    PropTypes.func.isRequired,
	onFetchPage: PropTypes.func.isRequired,
};

export default BaseList;
