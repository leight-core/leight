import {Select, SelectProps} from "antd";
import {FC, useEffect, useState} from "react";
import {useAppContext} from "../app/AppContext";
import {IGetCallback, IServerEvents} from "../server/interface";
import {Events} from "../utils/Events";
import {useFormContext} from "./FormContext";

export interface IBaseSelectProps extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IGetCallback
	/**
	 * Map requested data into Select's options.
	 */
	mapper: (item) => any
	/**
	 * Dependency used to force redraw (re-fetch data).
	 */
	dependency?: string
}

export const BaseSelect: FC<IBaseSelectProps> = ({fetch, mapper, dependency, ...props}) => {
	const [options, setOptions] = useState([]);
	const appContext = useAppContext();
	const formContext = useFormContext();
	useEffect(() => {
		formContext.block();
		const token = fetch(
			appContext,
			Events<IServerEvents>()
				.on("success", data => {
					setOptions(data.map(mapper));
					formContext.unblock();
				})
		);
		return () => token.cancel();
		// eslint-disable-next-line
	}, [dependency]);
	return (
		<Select
			options={options}
			showSearch={true}
			{...props}
		/>
	);
};
