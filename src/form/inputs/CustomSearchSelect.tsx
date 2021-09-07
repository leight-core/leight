import {IPageCallback, IPageResponse, IQuery, IToSearchMapper, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import React, {DependencyList, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export interface ICustomSearchSelectProps<TItem, TOrderBy, TFilter> extends SelectProps<any> {
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
	toSearch: IToSearchMapper<TOrderBy, TFilter>;
	/**
	 * Map requested data into Select's options.
	 */
	children: (item: TItem) => JSX.Element;
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number;
	/**
	 * Use label as placeholder for the select.
	 */
	usePlaceholder?: boolean;
	deps?: DependencyList;
}

export const CustomSearchSelect = <TItem, TOrderBy, TFilter>({search, query, toSearch, children, usePlaceholder, value, deps = [], debounce = 250, ...props}: ICustomSearchSelectProps<TItem, TOrderBy, TFilter>) => {
	const discoveryContext = useDiscoveryContext();
	const [data, setData] = useState<IPageResponse<TItem>>();
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
			.on("response", setData)
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
					setData(data);
					setLoading(false);
				});
		}, debounce) as unknown as number);
	};

	return data ? <Select
		showSearch={true}
		loading={loading}
		filterOption={() => true}
		notFoundContent={t("common.nothing-found")}
		onSearch={onSearch}
		value={value}
		{...props}
	>
		{data.items.map(children)}
	</Select> : <Select
		showSearch={true}
		loading={loading}
		{...props}
	/>;
};
