import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IBlockContext} from "./interface";

export const ModalBlockContext = createContext<IBlockContext>(null as any);

/**
 * Global (modal) application UI blocking context; useful when an app needs to lock user actions.
 */
export const useModalBlockContext = () => useContext(ModalBlockContext, "ModalBlockContext");
