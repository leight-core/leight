import {Select} from "antd";
import {SelectProps} from "antd/lib/select";
import {FC, useEffect, useState} from "react";
import {useAppContext} from "../app/AppContext";
import {ISearchRequest} from "../interface/interface";
import {IPostCallback} from "../server/createPost";
import {Events} from "../utils/Events";
import {useFormContext} from "./FormContext";

export interface IDebouncedSelectProps extends SelectProps<any> {
	/**
	 * Fetch used in effect to fetch data.
	 */
	fetch: IPostCallback<ISearchRequest>
	/**
	 * Map requested data into Select's options.
	 */
	mapper: (item) => any
	/**
	 * Debounce interval in ms.
	 */
	debounce?: number
	initial?: string
}

export const DebouncedSelect: FC<IDebouncedSelectProps> = ({fetch, mapper, initial = "", debounce = 250, ...props}) => {
	const appContext = useAppContext();
	const [options, setOptions] = useState([]);
	const [tid, setTid] = useState<number>();
	const formContext = useFormContext();
	useEffect(() => {
		formContext.block();
		fetch(
			{search: initial},
			appContext,
			Events()
				.on("success", data => {
					setOptions(data.map(mapper));
					formContext.unblock();
				})
		);
	}, []);
	return (
		<Select
			options={options}
			showSearch={true}
			onSearch={search => {
				clearTimeout(tid);
				setTid(setTimeout(() => {
					fetch(
						{search},
						appContext,
						Events()
							.on("success", data => setOptions(data.map(mapper)))
					);
				}, debounce) as unknown as number);
			}}
			{...props}
		/>
	);
};
