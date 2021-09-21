import {IQueryParams, ISourceContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const SourceContext = createContext<ISourceContext<any>>(null as any);

export const useSourceContext = <TQuery extends IQueryParams = IQueryParams, TRequest = any, TResponse = any, TOrderBy = any, TFilter = any>() => useContext<ISourceContext<TQuery, TRequest, TResponse, TOrderBy, TFilter>>(SourceContext, "SourceContext");
