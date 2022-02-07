import {ILayoutContext, ISiderCollapseContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

/**
 * Common Layout context; you should **not** use this directly, see {@link useLayoutContext}.
 */
export const LayoutContext = createContext<ILayoutContext>(null as unknown as ILayoutContext);

/**
 * Access to the current Layout context.
 */
export const useLayoutContext = () => useContext<ILayoutContext>(LayoutContext, "LayoutContext");

export const SiderCollapseContext = createContext<ISiderCollapseContext>(null as unknown as ISiderCollapseContext);

export const useSiderCollapseContext = () => useContext<ISiderCollapseContext>(SiderCollapseContext, "SiderCollapseContext");
