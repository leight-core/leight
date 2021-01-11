import {Select} from "antd";
import {SelectProps} from "antd/lib/select";
import {FC, useEffect, useState} from "react";
import {useAppContext} from "../app/AppContext";
import {IGetCallback} from "../server/createGet";
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
}

export const BaseSelect: FC<IBaseSelectProps> = ({fetch, mapper, ...props}) => {
	const [options, setOptions] = useState([]);
	const appContext = useAppContext();
	const formContext = useFormContext();
	useEffect(() => {
		formContext.block();
		const token = fetch(
			appContext,
			Events()
				.on("success", data => {
					setOptions(data.map(mapper));
					formContext.unblock();
				})
		);
		return () => token.cancel();
		// eslint-disable-next-line
	}, []);
	return (
		<Select
			options={options}
			showSearch={true}
			{...props}
		/>
	);
};
