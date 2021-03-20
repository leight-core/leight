import {Select, SelectProps} from "antd";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {ISearchRequest} from "../interface/interface";
import {IPostCallback} from "../server/interface";
import {useFormContext} from "./FormContext";
import {useOptionalFormItemContext} from "./FormItemContext";

export interface IDebouncedSelectProps<TItem = any> extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IPostCallback<ISearchRequest, TItem[]>
	/**
	 * Map requested data into Select's options.
	 */
	mapper: (item: TItem) => any
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number
	initial?: string
	usePlaceholder?: boolean
}

export const DebouncedSelect = <TItem extends unknown>({fetch, mapper, usePlaceholder, initial = "", debounce = 250, ...props}: IDebouncedSelectProps<TItem>) => {
	const discoveryContext = useDiscoveryContext();
	const [options, setOptions] = useState<any[]>([]);
	const [tid, setTid] = useState<number>();
	const formContext = useFormContext();
	const [loading, setLoading] = useState(true);
	const {t} = useTranslation();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => {
		fetch({search: initial}, discoveryContext)
			.on("request", () => {
				formContext.block();
				setLoading(true);
			})
			.on("response", data => {
				setOptions(data.map(mapper));
				setLoading(false);
				formContext.unblock();
			});
	}, []);
	return (
		<Select
			options={options}
			showSearch={true}
			loading={loading}
			filterOption={() => true}
			notFoundContent={t("common.nothing-found")}
			onSearch={search => {
				setLoading(true);
				clearTimeout(tid);
				setTid(setTimeout(() => {
					fetch({search}, discoveryContext)
						.on("response", data => {
							setOptions(data.map(mapper));
							setLoading(false);
						});
				}, debounce) as unknown as number);
			}}
			{...props}
		/>
	);
};
