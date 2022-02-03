import {IFilterContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const FilterContext = createContext<IFilterContext>(null as any);

/**
 * Access to UI blocking context of a Form.
 */
export const useFilterContext = <TFilter, >() => useContext<IFilterContext<TFilter>>(FilterContext, "FilterContext");
