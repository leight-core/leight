import {Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {ResultSpinner} from "../component/ResultSpinner";

export interface IFetchProps<TData = any> {
	/**
	 * Fetch factory callback; used in an effect to fetch (somehow get) data.
	 */
	fetch: (setData: Dispatch<SetStateAction<TData | undefined>>) => void | (() => void | undefined)
	/**
	 * Dependencies used in an effect; should control component redraws.
	 */
	deps?: any[]
	/**
	 * Actual children rendered when data are available.
	 */
	children?: (data: TData) => ReactNode
	/**
	 * Placeholder rendered when data are not available.
	 */
	placeholder?: () => ReactNode
}

/**
 * Simple fetch component used for providing fetch callback and rendering children when data is available delegating setting data state to an upper
 * component.
 */
export const Fetch = <TData extends unknown>({fetch, deps = [], children = () => null, placeholder = () => <ResultSpinner/>}: IFetchProps<TData>) => {
	const [data, setData] = useState<TData | undefined>(undefined as TData);
	useEffect(() => fetch(setData), deps);
	return <>
		{data !== undefined ? children(data) : placeholder()}
	</>;
};
