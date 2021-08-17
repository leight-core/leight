import {IDrawerContext, useContext, useOptionalContext} from "@leight-core/leight";
import {createContext} from "react";

export const DrawerContext = createContext<IDrawerContext>(null as any);

export const useDrawerContext = () => useContext<IDrawerContext>(DrawerContext, "DrawerContext");

export const useOptionalDrawerContext = () => useOptionalContext<IDrawerContext>(DrawerContext as any);
