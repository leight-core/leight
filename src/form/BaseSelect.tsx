import {Select, SelectProps} from "antd";
import {useEffect, useState} from "react";
import {Params} from "react-router";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IGetCallback} from "../server/interface";
import {useFormContext} from "./FormContext";
import {useOptionalFormItemContext} from "./FormItemContext";
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
	usePlaceholder?: boolean
}

export const BaseSelect = <TData extends unknown>({fetch, fetchParams, mapper, usePlaceholder, deps = [], ...props}: IBaseSelectProps<TData>) => {
	const [options, setOptions] = useState<IBaseSelectOption[]>([]);
	const [first, setFirst] = useState(true);
	const discoveryContext = useDiscoveryContext();
	const formContext = useFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => {
		const events = fetch(discoveryContext, fetchParams)
			.on("request", () => {
				formContext.block();
				setOptions([]);
			})
			.on("response", data => {
				if (!first && formItemContext) {
					formContext.form.setFields([
						{name: formItemContext.field, value: undefined},
					]);
				}
				setOptions(data.map(mapper));
				setFirst(false);
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
