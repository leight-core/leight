import {Result} from "antd";
import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {Loader} from "./Loader";

const MagicUndefined = "__leight-core.undefined";

export interface IFetchProps<TData = any> {
	/**
	 * Fetch factory callback; used in an effect to fetch (somehow get) data.
	 */
	fetch: (setData: Dispatch<SetStateAction<TData | null>>) => void | (() => void | undefined)
	/**
	 * Dependencies used in an effect; should control component redraws.
	 */
	deps?: any[]
	/**
	 * Actual children rendered when data are available.
	 */
	children: (data: TData) => ReactNode
	/**
	 * Placeholder rendered when data are not available.
	 */
	placeholder?: () => ReactNode
}

/**
 * Simple fetch component used for providing fetch callback and rendering children when data is available delegating setting data state to an upper
 * component.
 */
export const Fetch = <TData extends unknown>({fetch, deps = [], children, placeholder = () => <Result icon={<Loader isLoading={true}/>}/>}: IFetchProps<TData>) => {
	const [data, setData] = useState<TData | null>(MagicUndefined as TData);
	useEffect(() => {
		return fetch(setData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
	return (
		<>
			{data !== MagicUndefined ? children(data as TData) : placeholder()}
		</>
	);
};
