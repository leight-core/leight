import {IBaseSelectOption, IGetCallback, IQuery, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select as CoolSelect, SelectProps} from "antd";
import {DependencyList, forwardRef, Ref, useEffect, useRef, useState} from "react";

export interface ISelectProps<TData, TSelected = any> extends SelectProps<TSelected> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TData[]>;
	/**
	 * Optional parameters provided into fetch method.
	 */
	fetchParams?: IQuery;
	/**
	 * Map requested data into Select options.
	 */
	mapper: (item: TData) => IBaseSelectOption | false;
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: DependencyList;
	/**
	 * Use form item label as a placeholder.
	 */
	usePlaceholder?: boolean;
	/**
	 * An ability to forward refs as the control itself does not behave correctly if used without forwardRef.
	 */
	ref?: Ref<any>;
	/**
	 * Select a first value.
	 *
	 * Defaults to false.
	 */
	useFirst?: boolean;
}

export const Select = forwardRef(({fetch, fetchParams, mapper, usePlaceholder, useFirst = false, deps = [], ...props}: ISelectProps<any>, ref) => {
	const [options, setOptions] = useState<IBaseSelectOption[]>([]);
	const first = useRef(true);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => fetch(discoveryContext, fetchParams)
		.on("request", () => {
			formContext && formContext.blockContext.block();
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
			if (useFirst && options.length > 0 && !(formItemContext && formItemContext.getValue())) {
				formItemContext && formItemContext.setValue(options[0].value);
				props.onChange && props.onChange(options[0].value, options[0]);
			}
		})
		.on("done", () => {
			formContext && formContext.blockContext.unblock();
		})
		.cleaner(), deps);
	return <CoolSelect
		ref={ref as any}
		options={options}
		showSearch={true}
		{...props}
	/>;
}) as <TData, TSelected = any>(props: ISelectProps<TData, TSelected>) => JSX.Element;
