import {Select, SelectProps} from "antd";
import {forwardRef, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDiscoveryContext} from "../discovery/DiscoveryContext";
import {IParams, ISearchRequest} from "../interface/interface";
import {IPostCallback} from "../server/interface";
import {useOptionalFormContext} from "./FormContext";
import {useOptionalFormItemContext} from "./FormItemContext";

export interface IDebouncedSelectProps<TItem> extends SelectProps<TItem> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IPostCallback<ISearchRequest, TItem[]>
	/**
	 * Optional fetch params
	 */
	params?: IParams
	/**
	 * Map requested data into Select's options.
	 */
	mapper: (item: TItem) => any
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number
	initial?: string
	/**
	 * Use label as placeholder for the select.
	 */
	usePlaceholder?: boolean
}

export const DebouncedSelect = forwardRef(({fetch, params, mapper, usePlaceholder, initial = undefined, debounce = 250, ...props}: IDebouncedSelectProps<any>, ref) => {
	const discoveryContext = useDiscoveryContext();
	const [options, setOptions] = useState<any[]>([]);
	const [tid, setTid] = useState<number>();
	const formContext = useOptionalFormContext();
	const [loading, setLoading] = useState(true);
	const {t} = useTranslation();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => {
		fetch({search: initial || ""}, discoveryContext, params)
			.on("request", () => {
				formContext && formContext.block();
				setLoading(true);
			})
			.on("response", data => {
				setOptions(data.map(mapper));
			})
			.on("catch", (e) => {
				console.error(e);
			})
			.on("done", () => {
				setLoading(false);
				formContext && formContext.unblock();
			});
	}, []);
	return (
		<Select
			ref={ref as any}
			options={options}
			showSearch={true}
			loading={loading}
			filterOption={() => true}
			notFoundContent={t("common.nothing-found")}
			onSearch={search => {
				setLoading(true);
				clearTimeout(tid);
				setTid(setTimeout(() => {
					fetch({search}, discoveryContext, params)
						.on("response", data => {
							setOptions(data.map(mapper));
							setLoading(false);
						});
				}, debounce) as unknown as number);
			}}
			{...props}
		/>
	);
}) as <TItem extends any>(props: IDebouncedSelectProps<TItem>) => JSX.Element;
