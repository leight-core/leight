import {Select, SelectProps} from "antd";
import {forwardRef, Ref, useEffect, useRef, useState} from "react";
import {Params} from "react-router";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IGetCallback} from "../server/interface";
import {useOptionalFormContext} from "./FormContext";
import {useOptionalFormItemContext} from "./FormItemContext";
import {IBaseSelectOption} from "./interface";

export interface IBaseSelectProps<TData, TSelected = any> extends SelectProps<TSelected> {
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
	/**
	 * An ability to forward refs as the control itself does not behave correctly if used without forwardRef.
	 */
	ref?: Ref<any>
	/**
	 * Select a first value.
	 *
	 * Defaults to false.
	 */
	useFirst?: boolean
}

export const BaseSelect = forwardRef(({fetch, fetchParams, mapper, usePlaceholder, useFirst = false, deps = [], ...props}: IBaseSelectProps<any>, ref) => {
	const [options, setOptions] = useState<IBaseSelectOption[]>([]);
	const first = useRef(true);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => fetch(discoveryContext, fetchParams)
		.on("request", () => {
			formContext && formContext.block();
			setOptions([]);
		})
		.on("response", data => {
			if (!first.current && formItemContext && formContext) {
				formContext.form.setFields([
					{name: formItemContext.field, value: undefined},
				]);
			}
			const options = data.map(mapper).filter(item => item !== false) as IBaseSelectOption[];
			setOptions(options);
			first.current = false;
			if (useFirst && options.length > 0) {
				formItemContext && formItemContext.setValue(options[0].value);
				props.onChange && props.onChange(options[0].value, options[0]);
			}
		})
		.on("done", () => {
			formContext && formContext.unblock();
		})
		.cleaner(), deps);
	return <Select
		ref={ref as any}
		options={options}
		showSearch={true}
		{...props}
	/>;
}) as <TData extends any, TSelected = any>(props: IBaseSelectProps<TData, TSelected>) => JSX.Element;
