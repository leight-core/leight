import {IFulltextFilter, IQueryParams, IToOptionMapper, useOptionalFormContext, useOptionalFormItemContext, useSourceContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import React, {PropsWithChildren, useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";

export interface IQuerySourceSelectProps<TQuery extends IQueryParams, TResponse, TOrderBy, TFilter extends IFulltextFilter> extends Partial<SelectProps<any>> {
	/**
	 * Map requested data into Select's options.
	 */
	toOption: IToOptionMapper<TResponse>;
	/**
	 * Use label as placeholder for the select.
	 */
	usePlaceholder?: boolean;
	/**
	 * When this "something" changes, input is cleared (value set to undefined); this can be used to externally
	 * clear this input on change.
	 */
	clearOn?: any;
	disableOnEmpty?: boolean;
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number;
}

export const QuerySourceSelect = <TQuery extends IQueryParams, TResponse, TOrderBy, TFilter extends IFulltextFilter>(
	{
		toOption,
		/**
		 * Value extracted from props for to prevent showing it in the placeholder Select.
		 */
		value,
		debounce = 100,
		clearOn,
		usePlaceholder,
		disableOnEmpty = true,
		...props
	}: PropsWithChildren<IQuerySourceSelectProps<TQuery, TResponse, TOrderBy, TFilter>>) => {
	const tid = useRef<any>();
	const {t} = useTranslation();
	const sourceContext = useSourceContext<TQuery, TResponse, TOrderBy, IFulltextFilter>();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => {
		clearOn && formItemContext && formContext && formContext.form.setFields([
			{name: formItemContext.field, value: undefined},
		]);
	}, [clearOn]);
	return sourceContext.result.isSuccess ? <Select
		options={sourceContext.result.data.items.map(toOption)}
		showSearch={true}
		loading={sourceContext.result.isFetching}
		filterOption={() => true}
		notFoundContent={t("common.nothing-found")}
		onSearch={fulltext => {
			clearTimeout(tid.current);
			tid.current = setTimeout(() => {
				sourceContext.setFilter({fulltext});
			}, debounce);
		}}
		disabled={disableOnEmpty && sourceContext.result.data && !sourceContext.result.data.count}
		value={value}
		{...props}
	/> : <Select
		showSearch={true}
		loading={sourceContext.result.isLoading}
		disabled={disableOnEmpty}
		{...props}
	/>;
};
