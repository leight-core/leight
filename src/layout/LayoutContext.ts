import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {ILayoutContext} from "./interface";

/**
 * Common Layout context; you should **not** use this directly, see {@link useLayoutContext}.
 */
export const LayoutContext = createContext<ILayoutContext>(null as unknown as ILayoutContext);

/**
 * Access to the current Layout context.
 */
export const useLayoutContext = () => useContext<ILayoutContext>(LayoutContext, "LayoutContext");
