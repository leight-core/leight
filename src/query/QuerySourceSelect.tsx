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
}

export const QuerySourceSelect = <TQuery extends IQueryParams, TResponse, TOrderBy, TFilter extends IFulltextFilter>(
	{
		toOption,
		/**
		 * Value extracted from props for to prevent showing it in the placeholder Select.
		 */
		value,
		usePlaceholder,
		...props
	}: PropsWithChildren<IQuerySourceSelectProps<TQuery, TResponse, TOrderBy, TFilter>>) => {
	const first = useRef(true);
	const {t} = useTranslation();
	const sourceContext = useSourceContext<TQuery, TResponse, TOrderBy, IFulltextFilter>();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => {
		if (sourceContext.result.isSuccess) {
			/**
			 * Keep it this way, because this has soft dependency on form; formItemContext.setValue requires
			 * form.
			 */
			!first.current && formItemContext && formContext && formContext.form.setFields([
				{name: formItemContext.field, value: undefined},
			]);
			first.current = false;
		}
	}, [sourceContext.result.data]);
	return sourceContext.result.isSuccess ? <Select
		options={sourceContext.result.data.items.map(toOption)}
		filterOption={() => true}
		showSearch={true}
		notFoundContent={t("common.nothing-found")}
		onSearch={fulltext => {
			sourceContext.setFilter({fulltext});
		}}
		loading={sourceContext.result.isFetching}
		disabled={sourceContext.result.isFetching}
		value={value}
		{...props}
	/> : <Select
		showSearch={true}
		loading={sourceContext.result.isLoading}
		{...props}
	/>;
};
