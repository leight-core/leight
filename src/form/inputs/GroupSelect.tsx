import {IBaseGroupSelectOption, IGetCallback, IQuery, useDiscoveryContext, useOptionalFormContext} from "@leight-core/leight";
import {Select, SelectProps} from "antd";
import {DependencyList, forwardRef, useEffect, useState} from "react";

export interface IGroupSelectProps<TResponse, TSelected = any> extends SelectProps<TSelected> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback<TResponse[]>;
	/**
	 * Optional parameters provided into fetch method.
	 */
	query?: IQuery;
	/**
	 * Map requested data into Select options.
	 */
	toOption: (item: TResponse) => IBaseGroupSelectOption;
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	deps?: DependencyList;
}

export const GroupSelect = forwardRef(({fetch, query, toOption, deps = [], ...props}: IGroupSelectProps<any>, ref) => {
	const [options, setOptions] = useState<IBaseGroupSelectOption[]>([]);
	const discoveryContext = useDiscoveryContext();
	const formContext = useOptionalFormContext();
	useEffect(() => fetch(discoveryContext, query)
		.on("request", () => {
			formContext && formContext.blockContext.block();
		})
		.on("response", data => {
			setOptions(data.map(toOption));
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
}) as <TResponse extends any, TSelected = any>(props: IGroupSelectProps<TResponse, TSelected>) => JSX.Element;
