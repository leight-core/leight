import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IButtonContext} from "./interface";

export const ButtonContext = createContext<IButtonContext<any>>(null as any);

export const useButtonContext = <TButtons extends string>() => useContext<IButtonContext<TButtons>>(ButtonContext, "ButtonContext");
