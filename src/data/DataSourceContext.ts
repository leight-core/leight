import {IDataSourceContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const DataSourceContext = createContext<IDataSourceContext<any>>(null as unknown as IDataSourceContext<any>);

export const useDataSourceContext = <TItem>() => useContext<IDataSourceContext<TItem>>(DataSourceContext, "DataSourceContext");
