import {Select} from "antd";
import {SelectProps} from "antd/lib/select";
import {FC, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {ISearchRequest} from "../interface/interface";
import {IPostCallback} from "../server/interface";
import {Events} from "../utils/Events";
import {useFormContext} from "./FormContext";

export interface IDebouncedSelectProps extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IPostCallback<ISearchRequest>
	/**
	 * Map requested data into Select's options.
	 */
	mapper: (item) => any
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number
	initial?: string
}

export const DebouncedSelect: FC<IDebouncedSelectProps> = ({fetch, mapper, initial = "", debounce = 250, ...props}) => {
	const appContext = useAppContext();
	const [options, setOptions] = useState([]);
	const [tid, setTid] = useState<number>();
	const formContext = useFormContext();
	const [loading, setLoading] = useState(true);
	const {t} = useTranslation();
	useEffect(() => {
		formContext.block();
		setLoading(true);
		fetch(
			{search: initial},
			appContext,
			Events()
				.on("success", data => {
					setOptions(data.map(mapper));
					setLoading(false);
					formContext.unblock();
				})
		);
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
					fetch(
						{search},
						appContext,
						Events()
							.on("success", data => {
								setOptions(data.map(mapper));
								setLoading(false);
							})
					);
				}, debounce) as unknown as number);
			}}
			{...props}
		/>
	);
};
