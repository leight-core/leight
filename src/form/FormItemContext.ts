import {createContext} from "react";
import {useContext, useOptionalContext} from "../utils/useContext";
import {IFormItemContext} from "./interface";

export const FormItemContext = createContext<IFormItemContext>(null as any);

export const useFormItemContext = () => useContext<IFormItemContext>(FormItemContext, "FormItemContext");

export const useOptionalFormItemContext = () => useOptionalContext<IFormItemContext>(FormItemContext as any);
