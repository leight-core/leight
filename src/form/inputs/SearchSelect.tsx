import {IQueryParams, IToOptionMapper, IToQueryMapper, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

export interface ISearchSelectProps<TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any> extends SelectProps<any> {
	/**
	 * Search callback.
	 */
	search: () => void;
	/**
	 * Optional fetch params.
	 */
	query?: TQuery;
	/**
	 * How to map searched input to request on server-side.
	 */
	toQuery: IToQueryMapper<TOrderBy, TFilter>;
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
}

export const SearchSelect = <TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any>(
	{
		search,
		query,
		toQuery,
		toOption,
		usePlaceholder,
		value,
		useFirst = false,
		debounce = 250,
		...props
	}: ISearchSelectProps<TItem, TQuery, TOrderBy, TFilter>) => {
	const discoveryContext = useDiscoveryContext();
	const [options, setOptions] = useState<any[]>();
	const [tid, setTid] = useState<number>();
	const formContext = useOptionalFormContext();
	const [loading, setLoading] = useState(false);
	const {t} = useTranslation();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	// useEffect(
	// 	() => search(toSearch(formItemContext && formItemContext.getValue()), discoveryContext, query)
	// 		.on("request", () => {
	// 			formContext && formContext.blockContext.block();
	// 			setLoading(true);
	// 		})
	// 		.on("response", data => {
	// 			const options = data.items.map(toOption);
	// 			setOptions(options);
	// 			if (useFirst && options.length > 0) {
	// 				formItemContext && formItemContext.setValue(options[0].value);
	// 				props.onChange && props.onChange(options[0].value, options[0]);
	// 			}
	// 		})
	// 		.on("done", () => {
	// 			setLoading(false);
	// 			formContext && formContext.blockContext.unblock();
	// 		})
	// 		.cleaner(),
	// 	deps,
	// );

	const onSearch = (text: string) => {
		// setLoading(true);
		// clearTimeout(tid);
		// setTid(setTimeout(() => {
		// 	search(toSearch(text), discoveryContext, query)
		// 		.on("response", data => {
		// 			setOptions(data.items.map(toOption));
		// 			setLoading(false);
		// 		});
		// }, debounce) as unknown as number);
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
