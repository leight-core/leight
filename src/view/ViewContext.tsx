import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IViewContext} from "./interface";

export const ViewContext = createContext<IViewContext>(null as unknown as IViewContext);

export const useViewContext = () => useContext<IViewContext>(ViewContext, "ViewContext", "Please use CommonView or create context provider!");
