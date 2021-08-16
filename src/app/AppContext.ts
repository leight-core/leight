import {IAppContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

/**
 * Global application context; you should **not** access this directly.
 *
 * Use {@link useAppContext} instead.
 */
export const AppContext = createContext<IAppContext>(null as unknown as IAppContext);

/**
 * Use the global application context (like title and so).
 */
export const useAppContext = () => useContext<IAppContext>(AppContext, "AppContext");
