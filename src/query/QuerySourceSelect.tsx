import {IQueryParams, IToOptionMapper, useOptionalFormContext, useOptionalFormItemContext, useSourceContext, useUpdate} from "@leight-core/leight";
import {Empty, Select, SelectProps} from "antd";
import React, {PropsWithChildren, useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";

export interface IQuerySourceSelectProps<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter> extends Partial<SelectProps<any>> {
	/**
	 * Map requested data into Select's options.
	 */
	toOption: IToOptionMapper<TResponse>;
	/**
	 * Use label as placeholder for the select.
	 */
	usePlaceholder?: boolean;
	/**
	 * Select first value when available.
	 */
	useFirst?: boolean;
	/**
	 * When this "something" changes, input is cleared (value set to undefined); this can be used to externally
	 * clear this input on change.
	 */
	clearOn?: any;
	/**
	 * When se to true, select will filter values set.
	 */
	filter?: boolean;
	disableOnEmpty?: boolean;
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number;
}

export const QuerySourceSelect = <TQuery extends IQueryParams, TResponse, TOrderBy, TFilter>(
	{
		toOption,
		/**
		 * Value extracted from props for to prevent showing it in the placeholder Select.
		 */
		value,
		debounce = 100,
		clearOn = false,
		usePlaceholder,
		useFirst,
		showSearch = false,
		filter = !showSearch,
		disableOnEmpty = true,
		...props
	}: PropsWithChildren<IQuerySourceSelectProps<TQuery, TResponse, TOrderBy, TFilter>>) => {
	const tid = useRef<any>();
	const {t} = useTranslation();
	const sourceContext = useSourceContext<TQuery, TResponse, TOrderBy, TFilter>();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useUpdate([clearOn], () => {
		clearOn !== false && formItemContext && formContext && formContext.form.setFields([
			{name: formItemContext.field, value: undefined},
		]);
	});
	useEffect(() => {
		filter && sourceContext.setFilter({fulltext: value} as any);
	}, [value]);
	useEffect(() => {
		if (useFirst && sourceContext.result.isSuccess && sourceContext.result.data.items.length > 0 && !(formItemContext && formItemContext.getValue())) {
			// formItemContext && formItemContext.setValue(sourceContext.result.data.items[0].value);
			// props.onChange && props.onChange(options[0].value, options[0]);
		}
	}, []);
	return sourceContext.result.isSuccess ? <Select
		options={sourceContext.result.data.items.map(toOption)}
		loading={sourceContext.result.isFetching}
		filterOption={() => true}
		showSearch={showSearch}
		notFoundContent={<Empty description={t("common.nothing-found")}/>}
		onSearch={showSearch ? fulltext => {
			clearTimeout(tid.current);
			tid.current = setTimeout(() => {
				console.log("on search", fulltext);
				sourceContext.setFilter({fulltext} as any);
			}, debounce);
		} : undefined}
		onClear={() => sourceContext.setFilter()}
		disabled={!showSearch && disableOnEmpty && sourceContext.result.data && !sourceContext.result.data.count}
		value={value}
		{...props}
	/> : <Select
		showSearch={showSearch}
		loading={sourceContext.result.isLoading}
		disabled={disableOnEmpty}
		{...props}
	/>;
};
