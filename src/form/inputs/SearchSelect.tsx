import {IPageCallback, IQueryParams, IToOptionMapper, IToSearchMapper, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import React, {DependencyList, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export interface ISearchSelectProps<TItem, TOrderBy, TFilter> extends SelectProps<any> {
	/**
	 * Search callback.
	 */
	search: IPageCallback<TItem, TOrderBy, TFilter>;
	/**
	 * Optional fetch params.
	 */
	query?: IQueryParams;
	/**
	 * How to map searched input to request on server-side.
	 */
	toSearch: IToSearchMapper<TOrderBy, TFilter>;
	/**
	 * Map requested data into Select's options.
	 */
	toOption: IToOptionMapper<TItem>;
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number;
	/**
	 * Use label as placeholder for the select.
	 */
	usePlaceholder?: boolean;
	/**
	 * Select a first value.
	 *
	 * Defaults to false.
	 */
	useFirst?: boolean;
	deps?: DependencyList;
}

export const SearchSelect = <TItem, TOrderBy, TFilter>(
	{
		search,
		query,
		toSearch,
		toOption,
		usePlaceholder,
		value,
		deps = [],
		useFirst = false,
		debounce = 250,
		...props
	}: ISearchSelectProps<TItem, TOrderBy, TFilter>) => {
	const discoveryContext = useDiscoveryContext();
	const [options, setOptions] = useState<any[]>();
	const [tid, setTid] = useState<number>();
	const formContext = useOptionalFormContext();
	const [loading, setLoading] = useState(false);
	const {t} = useTranslation();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(
		() => search(toSearch(formItemContext && formItemContext.getValue()), discoveryContext, query)
			.on("request", () => {
				formContext && formContext.blockContext.block();
				setLoading(true);
			})
			.on("response", data => {
				const options = data.items.map(toOption);
				setOptions(options);
				if (useFirst && options.length > 0) {
					formItemContext && formItemContext.setValue(options[0].value);
					props.onChange && props.onChange(options[0].value, options[0]);
				}
			})
			.on("done", () => {
				setLoading(false);
				formContext && formContext.blockContext.unblock();
			})
			.cleaner(),
		deps,
	);

	const onSearch = (text: string) => {
		setLoading(true);
		clearTimeout(tid);
		setTid(setTimeout(() => {
			search(toSearch(text), discoveryContext, query)
				.on("response", data => {
					setOptions(data.items.map(toOption));
					setLoading(false);
				});
		}, debounce) as unknown as number);
	};

	return options ? <Select
		options={options}
		showSearch={true}
		loading={loading}
		filterOption={() => true}
		notFoundContent={t("common.nothing-found")}
		onSearch={onSearch}
		value={value}
		{...props}
	/> : <Select
		showSearch={true}
		loading={loading}
		{...props}
	/>;
};
