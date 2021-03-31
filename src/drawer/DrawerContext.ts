import {createContext} from "react";
import {useContext, useOptionalContext} from "../utils/useContext";
import {IDrawerContext} from "./interface";

export const DrawerContext = createContext<IDrawerContext>(null as any);

export const useDrawerContext = () => useContext<IDrawerContext>(DrawerContext, "DrawerContext");

export const useOptionalDrawerContext = () => useOptionalContext<IDrawerContext>(DrawerContext as any);
