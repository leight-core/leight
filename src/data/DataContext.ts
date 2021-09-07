import {IDataContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const DataContext = createContext<IDataContext<any, any, any>>(null as unknown as IDataContext<any, any, any>);

export const useDataContext = <TItem, TOrderBy = never, TFilter = never>() => useContext<IDataContext<TItem, TOrderBy, TFilter>>(DataContext, "PageContext");
