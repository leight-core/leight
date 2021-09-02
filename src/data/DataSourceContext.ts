import {IDataSourceContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const DataSourceContext = createContext<IDataSourceContext<any, any, any>>(null as unknown as IDataSourceContext<any, any, any>);

export const useDataSourceContext = <TItem, TOrderBy = never, TFilter = never>() => useContext<IDataSourceContext<TItem, TOrderBy, TFilter>>(DataSourceContext, "DataSourceContext");
