import {IBlockContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const ModalBlockContext = createContext<IBlockContext>(null as any);

/**
 * Global (modal) application UI blocking context; useful when an app needs to lock user actions.
 */
export const useModalBlockContext = () => useContext(ModalBlockContext, "ModalBlockContext");
