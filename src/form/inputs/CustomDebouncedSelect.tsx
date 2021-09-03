import {IParams, IPostCallback, IQuery, ISearchRequest, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import {DependencyList, forwardRef, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export interface ICustomDebouncedSelectProps<TItem, TSelected = any> extends SelectProps<TSelected> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IPostCallback<ISearchRequest, TItem[]>;
	/**
	 * Extra (optional) search request parameters.
	 */
	params?: IParams;
	/**
	 * Limit number of items (if the fetch side respects this setting).
	 *
	 * Defaults to 10.
	 */
	limit?: number;
	/**
	 * Optional fetch params.
	 */
	query?: IQuery;
	/**
	 * Map requested data into Select's options.
	 */
	children: (item: TItem) => JSX.Element;
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
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: DependencyList;
}

export const CustomDebouncedSelect = forwardRef(({fetch, query, params, limit = 10, children, usePlaceholder, deps = [], initial = undefined, debounce = 250, ...props}: ICustomDebouncedSelectProps<any>, ref) => {
	const discoveryContext = useDiscoveryContext();
	const [data, setData] = useState<any[]>([]);
	const [tid, setTid] = useState<number>();
	const formContext = useOptionalFormContext();
	const [loading, setLoading] = useState(false);
	const {t} = useTranslation();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(
		() => fetch({
			search: initial || (formItemContext ? (formItemContext.getValue() || "") : ""),
			params,
			limit,
		}, discoveryContext, query)
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
		deps.concat([formItemContext && formItemContext.getValue()])
	);

	const onSearch = (search: string) => {
		setLoading(true);
		clearTimeout(tid);
		setTid(setTimeout(() => {
			fetch({search, params, limit}, discoveryContext, query)
				.on("response", data => {
					setData(data);
					setLoading(false);
				});
		}, debounce) as unknown as number);
	};

	return <Select
		ref={ref as any}
		showSearch={true}
		loading={loading}
		filterOption={() => true}
		notFoundContent={t("common.nothing-found")}
		onSearch={onSearch}
		{...props}
	>
		{data.map(children)}
	</Select>;
}) as <TItem, TSelected = any>(props: ICustomDebouncedSelectProps<TItem, TSelected>) => JSX.Element;
