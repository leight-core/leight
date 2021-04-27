import {Select, SelectProps} from "antd";
import {forwardRef, useEffect, useState} from "react";
import {Params} from "react-router";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IGetCallback} from "../server/interface";
import {useOptionalFormContext} from "./FormContext";
import {useOptionalFormItemContext} from "./FormItemContext";
import {IBaseSelectOption} from "./interface";

export interface IBaseSelectProps<TData> extends SelectProps<TData> {
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
	mapper: (item: TData) => IBaseSelectOption | false
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: any[]
	/**
	 * Use form item label as a placeholder.
	 */
	usePlaceholder?: boolean
}

export const BaseSelect = forwardRef(({fetch, fetchParams, mapper, usePlaceholder, deps = [], ...props}: IBaseSelectProps<any>, ref) => {
	const [options, setOptions] = useState<IBaseSelectOption[]>([]);
	const [first, setFirst] = useState(true);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => {
		return fetch(discoveryContext, fetchParams)
			.on("request", () => {
				formContext && formContext.block();
				setOptions([]);
			})
			.on("response", data => {
				if (!first && formItemContext && formContext) {
					formContext.form.setFields([
						{name: formItemContext.field, value: undefined},
					]);
				}
				setOptions(data.map(mapper).filter(item => item !== false) as IBaseSelectOption[]);
				setFirst(false);
				formContext && formContext.unblock();
			})
			.cleaner();
		// eslint-disable-next-line
	}, deps);
	return (
		<Select
			ref={ref as any}
			options={options}
			showSearch={true}
			{...props}
		/>
	);
}) as <TData extends any>(props: IBaseSelectProps<TData>) => JSX.Element;
