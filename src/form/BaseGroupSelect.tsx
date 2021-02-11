import {Select, SelectProps} from "antd";
import {useEffect, useState} from "react";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {IGetCallback, IServerEvents} from "../server/interface";
import {Events} from "../utils/Events";
import {useFormContext} from "./FormContext";
import {IBaseGroupSelectOption} from "./interface";

export interface IBaseGroupSelectProps<TData> extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback
	/**
	 * Optional parameters provided into fetch method.
	 */
	fetchParams?: Params
	/**
	 * Map requested data into Select options.
	 */
	mapper: (item: TData) => IBaseGroupSelectOption
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: any[]
}

export const BaseGroupSelect = <TData extends unknown>({fetch, fetchParams, mapper, deps = [], ...props}: IBaseGroupSelectProps<TData>) => {
	const [options, setOptions] = useState<IBaseGroupSelectOption[]>([]);
	const appContext = useAppContext();
	const formContext = useFormContext();
	useEffect(() => {
		formContext.block();
		const token = fetch(
			appContext,
			Events<IServerEvents>()
				.on("success", data => {
					setOptions(data.map(mapper));
					formContext.unblock();
				}),
			fetchParams
		);
		return () => token.cancel();
		// eslint-disable-next-line
	}, deps);
	return (
		<Select
			showSearch={true}
			{...props}
		>
			{options.map(item => (
				item.children.length &&
				<Select.OptGroup key={item.label} label={item.label}>
					{item.children.map(item => (
						<Select.Option key={item.value} value={item.value} children={item.label}/>
					))}
				</Select.OptGroup>
			))}
		</Select>
	);
};
