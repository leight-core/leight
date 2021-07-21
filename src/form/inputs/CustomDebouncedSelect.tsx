import {Select, SelectProps} from "antd";
import {forwardRef, ReactNode, Ref, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDiscoveryContext} from "../../discovery/DiscoveryContext";
import {ISearchRequest} from "../../interface/interface";
import {IParams} from "../../link/interface";
import {IPostCallback} from "../../server/interface";
import {useOptionalFormContext} from "../FormContext";
import {useOptionalFormItemContext} from "../FormItemContext";

export interface ICustomDebouncedSelectProps<TItem, TSelected = any> extends SelectProps<TSelected> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IPostCallback<ISearchRequest, TItem[]>;
	/**
	 * Extra (optional) search request parameters.
	 */
	extra?: any;
	/**
	 * Limit number of items (if the fetch side respects this setting).
	 *
	 * Defaults to 10.
	 */
	limit?: number;
	/**
	 * Optional fetch params.
	 */
	params?: IParams;
	/**
	 * Map requested data into Select's options.
	 */
	children: (item: TItem) => ReactNode;
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
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: any[];
}

export const CustomDebouncedSelect = forwardRef(({fetch, params, extra, limit = 10, children, usePlaceholder, deps = [], initial = undefined, debounce = 250, ...props}: ICustomDebouncedSelectProps<any>, ref) => {
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
			params: extra,
			limit,
		}, discoveryContext, params)
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

	const onSearch = search => {
		setLoading(true);
		clearTimeout(tid);
		setTid(setTimeout(() => {
			fetch({search, params: extra, limit}, discoveryContext, params)
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
		children={data.map(children)}
		{...props}
	/>;
}) as <TItem, TSelected = any>(props: ICustomDebouncedSelectProps<TItem, TSelected>) => JSX.Element;
