import {Select, SelectProps} from "antd";
import {forwardRef, ReactNode, Ref, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {useDiscoveryContext} from "../../discovery/DiscoveryContext";
import {IGetCallback} from "../../server/interface";
import {useOptionalFormContext} from "../FormContext";
import {useOptionalFormItemContext} from "../FormItemContext";

export interface ICustomBaseSelectProps<TData, TSelected = any> extends SelectProps<TSelected> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TData[]>;
	/**
	 * Optional parameters provided into fetch method.
	 */
	fetchParams?: Params;
	/**
	 * Map requested data into Select options.
	 */
	children: (item: TData) => ReactNode;
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: any[];
	/**
	 * Use form item label as a placeholder.
	 */
	usePlaceholder?: boolean;
	/**
	 * An ability to forward refs as the control itself does not behave correctly if used without forwardRef.
	 */
	ref?: Ref<any>;
}

export const CustomBaseSelect = forwardRef(({fetch, fetchParams, children, usePlaceholder, deps = [], ...props}: ICustomBaseSelectProps<any>, ref) => {
	const {t} = useTranslation();
	const [data, setData] = useState<any[]>([]);
	const first = useRef(true);
	const [loading, setLoading] = useState(false);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	const formItemContext = useOptionalFormItemContext();
	formItemContext && usePlaceholder && (props.placeholder = formItemContext.label);
	useEffect(() => fetch(discoveryContext, fetchParams)
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
	return <Select
		ref={ref as any}
		loading={loading}
		notFoundContent={t("common.nothing-found")}
		children={data.map(children)}
		{...props}
	/>;
}) as <TData, TSelected = any>(props: ICustomBaseSelectProps<TData, TSelected>) => JSX.Element;
