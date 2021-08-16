import {IButtonContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const ButtonContext = createContext<IButtonContext<any>>(null as any);

export const useButtonContext = <TButtons extends string>() => useContext<IButtonContext<TButtons>>(ButtonContext, "ButtonContext");
