import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import {Empty, Select, SelectProps} from "antd";
import {FC, ReactNode, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IParams, ISearchItem, ISearchRequest, ISearchResult} from "../interface/interface";
import {IPostCallback} from "../server/interface";

export interface ISearchProps extends Partial<SelectProps<any>> {
	/**
	 * Search handler
	 */
	search: IPostCallback<ISearchRequest, ISearchResult>
	/**
	 * Optional search parameters
	 */
	params?: IParams
	/**
	 * Optional method responsible for rendering an item
	 */
	render?: (item: ISearchItem) => ReactNode
}

export const Search: FC<ISearchProps> = (
	{
		search,
		params,
		render = (item => item.name),
		...props
	}) => {
	const discoveryContext = useDiscoveryContext();
	const {t} = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [result, setResult] = useState<ISearchResult>();
	const [id, setId] = useState<any>();

	function doSearch(value = "") {
		clearTimeout(id);
		setLoading(true);
		setId(setTimeout(() => {
			search({search: value}, discoveryContext, params)
				.on("response", setResult)
				.on("done", () => {
					setLoading(false);
				})
				.on("catch", error => {
					console.error("catch", error);
				});
		}, 250));
	}

	return (
		<Select
			size={"large"}
			showSearch
			defaultActiveFirstOption={false}
			onSearch={doSearch}
			onClear={() => doSearch()}
			allowClear
			suffixIcon={loading ? <LoadingOutlined/> : <SearchOutlined/>}
			filterOption={false}
			loading={loading}
			placeholder={t("common.search.placeholder")}
			notFoundContent={<Empty description={t("common.search.empty")} image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
			{...props}
			children={result && result.items.map(item => (
				<Select.Option key={item.id} value={item.id} item={item} children={render(item)}/>
			))}
		/>
	);
};
