import {FilterContext} from "@leight-core/leight";
import {PropsWithChildren, useState} from "react";

export type IFilterContextProviderProps<TFilter = any> = PropsWithChildren<{
	defaultFilter?: TFilter;
}>

export function FilterContextProvider<TFilter, >({defaultFilter, ...props}: PropsWithChildren<IFilterContextProviderProps<TFilter>>) {
	const [filter, setFilter] = useState<TFilter | undefined>(defaultFilter);
	return <FilterContext.Provider
		value={{
			filter,
			setFilter: filter => setFilter({...filter, ...defaultFilter}),
		}}
		{...props}
	/>;
}
