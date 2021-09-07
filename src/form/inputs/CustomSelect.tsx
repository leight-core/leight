import {IGetCallback, IQuery, useDiscoveryContext, useOptionalFormContext, useOptionalFormItemContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import React, {DependencyList, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

export interface ICustomSelectProps<TItem> extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TItem[]>;
	/**
	 * Optional parameters provided into fetch method.
	 */
	query?: IQuery;
	/**
	 * Map requested data into Select options.
	 */
	children: (item: TItem) => JSX.Element;
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: DependencyList;
	/**
	 * Use form item label as a placeholder.
	 */
	usePlaceholder?: boolean;
}

export const CustomSelect = <TItem, >({fetch, query, children, usePlaceholder, deps = [], ...props}: ICustomSelectProps<TItem>) => {
	const {t} = useTranslation();
	const [data, setData] = useState<any[]>();
	const first = useRef(true);
	const [loading, setLoading] = useState(false);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => fetch(discoveryContext, query)
		.on("request", () => {
			formContext && formContext.blockContext.block();
			setData([]);
			setLoading(true);
		})
		.on("response", data => {
			if (!first.current && formItemContext && formContext) {
				formContext.form.setFields([
					{name: formItemContext.field, value: undefined},
				]);
			}
			setData(data);
			first.current = false;
		})
		.on("done", () => {
			formContext && formContext.blockContext.unblock();
			setLoading(false);
		})
		.cleaner(), deps);
	return data ? <Select
		loading={loading}
		notFoundContent={t("common.nothing-found")}
		{...props}
	>
		{data.map(children)}
	</Select> : <Select
		showSearch={true}
		loading={loading}
		{...props}
	/>;
};
