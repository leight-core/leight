import {IPageContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const PageContext = createContext<IPageContext<any, any, any>>(null as unknown as IPageContext<any, any, any>);

export const usePageContext = <TItem, TOrderBy = never, TFilter = never>() => useContext<IPageContext<TItem, TOrderBy, TFilter>>(PageContext, "PageContext");
