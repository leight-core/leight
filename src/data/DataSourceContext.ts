import {IDataSourceContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const DataSourceContext = createContext<IDataSourceContext<any, any>>(null as unknown as IDataSourceContext<any, any>);

export const useDataSourceContext = <TItem, TOrderBy = never>() => useContext<IDataSourceContext<TItem, TOrderBy>>(DataSourceContext, "DataSourceContext");
