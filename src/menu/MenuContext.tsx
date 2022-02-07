import {IMenuElementContext, IMenuSelectionContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const MenuElementContext = createContext<IMenuElementContext>(null as unknown as IMenuElementContext);

export const useMenuElementContext = () => useContext<IMenuElementContext>(MenuElementContext, "MenuElementContext");

export const MenuSelectionContext = createContext<IMenuSelectionContext>(null as unknown as IMenuSelectionContext);

export const useMenuSelectionContext = () => useContext<IMenuSelectionContext>(MenuSelectionContext, "MenuSelectionContext");
