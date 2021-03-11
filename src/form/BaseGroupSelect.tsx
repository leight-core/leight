import {Select, SelectProps} from "antd";
import {useEffect, useState} from "react";
import {Params} from "react-router";
import {useAppContext} from "../app/AppContext";
import {IGetCallback} from "../server/interface";
import {useFormContext} from "./FormContext";
import {IBaseGroupSelectOption} from "./interface";

export interface IBaseGroupSelectProps<TResponse> extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TResponse[]>
	/**
	 * Optional parameters provided into fetch method.
	 */
	fetchParams?: Params
	/**
	 * Map requested data into Select options.
	 */
	mapper: (item: TResponse) => IBaseGroupSelectOption
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: any[]
}

export const BaseGroupSelect = <TResponse extends unknown = any>({fetch, fetchParams, mapper, deps = [], ...props}: IBaseGroupSelectProps<TResponse>) => {
	const [options, setOptions] = useState<IBaseGroupSelectOption[]>([]);
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
