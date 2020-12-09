import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IMenuContext} from "./interface";

export const MenuContext = createContext<IMenuContext>(null as unknown as IMenuContext);

/**
 * Access to the current Layout context.
 */
export const useMenuContext = () => useContext<IMenuContext>(MenuContext, "MenuContext");
