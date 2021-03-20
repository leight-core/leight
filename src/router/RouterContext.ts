import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IRouterContext} from "./interface";

/**
 * Global routing context; all stuff related to routing should be used through this.
 */
export const RouterContext = createContext<IRouterContext>(null as unknown as IRouterContext);

/**
 * Hook for router context usage.
 */
export const useRouterContext = () => useContext<IRouterContext>(RouterContext, "RouterContext");
