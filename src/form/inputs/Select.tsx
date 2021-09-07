import {IBaseSelectOption, IGetCallback, IQuery, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select as CoolSelect, SelectProps} from "antd";
import React, {DependencyList, useEffect, useRef, useState} from "react";

export interface ISelectProps<TItem> extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TItem[]>;
	/**
	 * Optional parameters provided into fetch method.
	 */
	query?: IQuery;
	/**
	 * Map requested data into Select options.
	 */
	toOption: (item: TItem) => IBaseSelectOption | false;
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: DependencyList;
	/**
	 * Use form item label as a placeholder.
	 */
	usePlaceholder?: boolean;
	/**
	 * Select a first value.
	 *
	 * Defaults to false.
	 */
	useFirst?: boolean;
}

export const Select = <TItem, >({fetch, query, toOption, usePlaceholder, useFirst = false, deps = [], ...props}: ISelectProps<TItem>) => {
	const [options, setOptions] = useState<IBaseSelectOption[]>();
	const first = useRef(true);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => fetch(discoveryContext, query)
		.on("request", () => {
			formContext && formContext.blockContext.block();
			setOptions(undefined);
		})
		.on("response", data => {
			if (!first.current && formItemContext && formContext) {
				formContext.form.setFields([
					{name: formItemContext.field, value: undefined},
				]);
			}
			const options = data.map(toOption).filter(item => item !== false) as IBaseSelectOption[];
			setOptions(options);
			first.current = false;
			if (useFirst && options.length > 0 && !(formItemContext && formItemContext.getValue())) {
				formItemContext && formItemContext.setValue(options[0].value);
				props.onChange && props.onChange(options[0].value, options[0]);
			}
		})
		.on("done", () => {
			formContext && formContext.blockContext.unblock();
		})
		.cleaner(), deps);
	return options ? <CoolSelect
		options={options}
		showSearch={true}
		{...props}
	/> : <CoolSelect
		options={options}
		showSearch={true}
		loading={true}
	/>;
};
