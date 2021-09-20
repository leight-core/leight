import {IDataContext, IQueryParams, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const DataContext = createContext<IDataContext<any, any>>(null as unknown as IDataContext<any, any>);

export const useDataContext = <TItem, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any>() => useContext<IDataContext<TItem, TQuery, TOrderBy, TFilter>>(DataContext, "DataContext");
