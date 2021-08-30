import {IMenuContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const MenuContext = createContext<IMenuContext>(null as unknown as IMenuContext);

/**
 * Access to the current Layout context.
 */
export const useMenuContext = () => useContext<IMenuContext>(MenuContext, "MenuContext");
