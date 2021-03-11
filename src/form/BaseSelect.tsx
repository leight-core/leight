import {Select, SelectProps} from "antd";
import {useEffect, useState} from "react";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {IGetCallback} from "../server/interface";
import {useFormContext} from "./FormContext";
import {IBaseSelectOption} from "./interface";

export interface IBaseSelectProps<TData> extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TData[]>
	/**
	 * Optional parameters provided into fetch method.
	 */
	fetchParams?: Params
	/**
	 * Map requested data into Select options.
	 */
	mapper: (item: TData) => IBaseSelectOption
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: any[]
}

export const BaseSelect = <TData extends unknown>({fetch, fetchParams, mapper, deps = [], ...props}: IBaseSelectProps<TData>) => {
	const [options, setOptions] = useState<IBaseSelectOption[]>([]);
	const appContext = useAppContext();
	const formContext = useFormContext();
	useEffect(() => {
		const events = fetch(appContext, fetchParams)
			.on("request", () => {
				formContext.block();
			})
			.on("response", data => {
				setOptions(data.map(mapper));
				formContext.unblock();
			});
		return () => events.dismiss();
		// eslint-disable-next-line
	}, deps);
	return (
		<Select
			options={options}
			showSearch={true}
			{...props}
		/>
	);
};
