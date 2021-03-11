import {Select, SelectProps} from "antd";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {ISearchRequest} from "../interface/interface";
import {IPostCallback} from "../server/interface";
import {useFormContext} from "./FormContext";

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
}

export const DebouncedSelect = <TItem extends unknown>({fetch, mapper, initial = "", debounce = 250, ...props}: IDebouncedSelectProps<TItem>) => {
	const appContext = useAppContext();
	const [options, setOptions] = useState<any[]>([]);
	const [tid, setTid] = useState<number>();
	const formContext = useFormContext();
	const [loading, setLoading] = useState(true);
	const {t} = useTranslation();
	useEffect(() => {
		fetch({search: initial}, appContext)
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
					fetch({search}, appContext)
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
