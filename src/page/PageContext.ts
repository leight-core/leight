import {IPageContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const PageContext = createContext<IPageContext>(null as any);

export const usePageContext = () => useContext<IPageContext>(PageContext, "PageContext");
