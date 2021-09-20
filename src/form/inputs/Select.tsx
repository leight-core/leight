import {IBaseSelectOption, IQueryParams, IRequestHookCallback, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select as CoolSelect, SelectProps} from "antd";
import React, {DependencyList, useEffect, useRef, useState} from "react";

export interface ISelectProps<TQuery extends IQueryParams, TResponse = any> extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IRequestHookCallback<TQuery, undefined, TResponse[]>;
	/**
	 * Optional parameters provided into fetch method.
	 */
	query?: TQuery;
	/**
	 * Map requested data into Select options.
	 */
	toOption: (item: TResponse) => IBaseSelectOption | false;
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

export const Select = <TQuery extends IQueryParams, TResponse = any>({fetch, query, toOption, usePlaceholder, useFirst = false, deps = [], value, ...props}: ISelectProps<TQuery, TResponse>) => {
	const [options, setOptions] = useState<IBaseSelectOption[]>();
	const first = useRef(true);
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => fetch(undefined, query)
			.events
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
			.cleaner(),
		deps
	);
	return options ? <CoolSelect
		options={options}
		showSearch={true}
		value={value}
		{...props}
	/> : <CoolSelect
		showSearch={true}
		loading={true}
		{...props}
	/>;
};
