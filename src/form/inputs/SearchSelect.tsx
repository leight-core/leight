import {IBaseSelectOption, IPageCallback, IPageRequest, IQuery, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
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
	query?: IQuery;
	/**
	 * How to map searched input to request on server-side.
	 */
	toSearch: (search?: string) => IPageRequest<TOrderBy, TFilter>;
	/**
	 * Map requested data into Select's options.
	 */
	toOption: (item: TItem) => IBaseSelectOption;
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number;
	/**
	 * Initial value.
	 */
	initial?: string;
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
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: DependencyList;
}

export const SearchSelect = <TItem, TOrderBy, TFilter>(
	{
		search,
		query,
		toSearch,
		toOption,
		usePlaceholder,
		useFirst = false,
		deps = [],
		initial = undefined,
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
		() => search(toSearch(initial || (formItemContext && formItemContext.getValue())), discoveryContext, query)
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
		deps.concat([formItemContext && formItemContext.getValue()])
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
		{...props}
	/> : <Select
		options={options}
		showSearch={true}
		loading={loading}
	/>;
};
