import {SearchOutlined} from "@ant-design/icons";
import {Empty, Select, SelectProps} from "antd";
import {FC, ReactNode, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {ISearchRequest} from "../interface/interface";
import {IPostCallback, IServerEvents} from "../server/interface";
import {Events} from "../utils/Events";

export interface ISearchItem {
	id: string
	name: string
	type: string
}

export interface ISearchProps extends Partial<SelectProps<any>> {
	mapper: (data: any) => ISearchItem[]
	search: IPostCallback<IServerEvents, ISearchRequest>
	render?: (item: ISearchItem) => ReactNode
}

export const Search: FC<ISearchProps> = (
	{
		search,
		mapper = data => data.items.map(item => ({
			label: item.name,
			value: item.id,
			...item
		})),
		render = (item => item.name),
		...props
	}) => {
	const appContext = useAppContext();
	const {t} = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<ISearchItem[]>([]);
	const [id, setId] = useState<any>();

	function doSearch(value = "") {
		clearTimeout(id);
		setLoading(true);
		setId(setTimeout(() => {
			search(
				{search: value},
				appContext,
				Events<IServerEvents>()
					.on<ISearchItem[]>("success", data => {
						setData(mapper(data));
					})
					.on("done", _ => {
						setLoading(false);
					})
			);
		}, 250));
	}

	return (
		<Select
			size={"large"}
			showSearch
			defaultActiveFirstOption={false}
			onSearch={doSearch}
			onClear={() => doSearch()}
			onChange={_ => doSearch()}
			allowClear
			suffixIcon={<SearchOutlined/>}
			filterOption={false}
			loading={loading}
			placeholder={t("common.search.placeholder")}
			notFoundContent={<Empty description={t("common.search.empty")} image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
			{...props}
		>
			{data.map(item => (
				<Select.Option key={item.id} value={item.id} item={item}>
					{render(item)}
				</Select.Option>
			))}
		</Select>
	);
};
