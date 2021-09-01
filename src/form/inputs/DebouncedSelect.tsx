import {IParams, IPostCallback, IQuery, ISearchRequest, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import {DependencyList, forwardRef, Ref, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

export interface IDebouncedSelectProps<TItem, TSelected = any> extends SelectProps<TSelected> {
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
	mapper: (item: TItem) => any;
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
	 * An ability to forward refs as the control itself does not behave correctly if used without forwardRef.
	 */
	ref?: Ref<any>;
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

export const DebouncedSelect = forwardRef(({fetch, query, params, limit = 10, mapper, usePlaceholder, useFirst = false, deps = [], initial = undefined, debounce = 250, ...props}: IDebouncedSelectProps<any>, ref) => {
	const discoveryContext = useDiscoveryContext();
	const [options, setOptions] = useState<any[]>([]);
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
			.on("response", data => {
				const options = data.map(mapper);
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

	const onSearch = (search: string) => {
		setLoading(true);
		clearTimeout(tid);
		setTid(setTimeout(() => {
			fetch({search, params, limit}, discoveryContext, query)
				.on("response", data => {
					setOptions(data.map(mapper));
					setLoading(false);
				});
		}, debounce) as unknown as number);
	};

	return <Select
		ref={ref as any}
		options={options}
		showSearch={true}
		loading={loading}
		filterOption={() => true}
		notFoundContent={t("common.nothing-found")}
		onSearch={onSearch}
		{...props}
	/>;
}) as <TItem, TSelected = any>(props: IDebouncedSelectProps<TItem, TSelected>) => JSX.Element;
