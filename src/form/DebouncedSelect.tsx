import {Select} from "antd";
import {SelectProps} from "antd/lib/select";
import {FC, useState} from "react";
import {useAppContext} from "../app/AppContext";
import {ISearchRequest} from "../interface/interface";
import {IPostCallback} from "../server/createPost";
import {Events} from "../utils/Events";

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
}

export const DebouncedSelect: FC<IDebouncedSelectProps> = ({fetch, mapper, debounce = 250, ...props}) => {
	const appContext = useAppContext();
	const [options, setOptions] = useState([]);
	const [tid, setTid] = useState<number>();
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
							.on("success", data => setOptions(mapper(data)))
					);
				}, debounce) as unknown as number);
			}}
			{...props}
		/>
	);
};
