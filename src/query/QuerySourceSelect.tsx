import {IFulltextFilter, IQueryParams, IToOptionMapper, useOptionalFormItemContext, useSourceContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import React, {PropsWithChildren} from "react";
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
	const {t} = useTranslation();
	const sourceContext = useSourceContext<TQuery, TResponse, TOrderBy, IFulltextFilter>();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	return sourceContext.result.isSuccess ? <Select
		options={sourceContext.result.data.items.map(toOption)}
		filterOption={() => true}
		notFoundContent={t("common.nothing-found")}
		onSearch={fulltext => {
			sourceContext.setFilter({fulltext});
		}}
		value={value}
		{...props}
	/> : <Select
		showSearch={true}
		loading={sourceContext.result.isLoading}
		{...props}
	/>;
};
