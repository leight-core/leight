import {IFormItemContext, useContext, useOptionalContext} from "@leight-core/leight";
import {createContext} from "react";

export const FormItemContext = createContext<IFormItemContext>(null as any);

export const useFormItemContext = () => useContext<IFormItemContext>(FormItemContext, "FormItemContext");

export const useOptionalFormItemContext = () => useOptionalContext<IFormItemContext>(FormItemContext as any);
