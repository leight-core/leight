import {IQueryParams, ISourceContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const SourceContext = createContext<ISourceContext<any, any, any, any>>(null as any);

export const useSourceContext = <TQuery extends IQueryParams, TResponse, TOrderBy, TFilter>() => useContext<ISourceContext<TQuery, TResponse, TOrderBy, TFilter>>(SourceContext, "SourceContext");
