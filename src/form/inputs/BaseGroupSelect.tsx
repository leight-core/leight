import {Select, SelectProps} from "antd";
import {forwardRef, Ref, useEffect, useState} from "react";
import {useDiscoveryContext} from "../../discovery/DiscoveryContext";
import {IParams} from "../../link/interface";
import {IGetCallback} from "../../server/interface";
import {useOptionalFormContext} from "../FormContext";
import {IBaseGroupSelectOption} from "../interface";

export interface IBaseGroupSelectProps<TResponse, TSelected = any> extends SelectProps<TSelected> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TResponse[]>;
	/**
	 * Optional parameters provided into fetch method.
	 */
	fetchParams?: IParams;
	/**
	 * Map requested data into Select options.
	 */
	mapper: (item: TResponse) => IBaseGroupSelectOption;
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: any[];
	/**
	 * An ability to forward refs as the control itself does not behave correctly if used without forwardRef.
	 */
	ref?: Ref<any>;
}

export const BaseGroupSelect = forwardRef(({fetch, fetchParams, mapper, deps = [], ...props}: IBaseGroupSelectProps<any>, ref) => {
	const [options, setOptions] = useState<IBaseGroupSelectOption[]>([]);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	useEffect(() => fetch(discoveryContext, fetchParams)
		.on("request", () => {
			formContext && formContext.blockContext.block();
		})
		.on("response", data => {
			setOptions(data.map(mapper));
		})
		.on("done", () => {
			formContext && formContext.blockContext.unblock();
		})
		.cleaner(), deps);
	return <Select
		ref={ref as any}
		showSearch={true}
		{...props}
	>
		{options.map(item => (
			item.children.length &&
			<Select.OptGroup key={item.label} label={item.label}>
				{item.children.map(item => (
					<Select.Option key={item.value} value={item.value} children={item.label}/>
				))}
			</Select.OptGroup>
		))}
	</Select>;
}) as <TResponse extends any, TSelected = any>(props: IBaseGroupSelectProps<TResponse, TSelected>) => JSX.Element;
