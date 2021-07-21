import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IParamContext} from "./interface";

export const ParamContext = createContext(null as unknown as IParamContext);

export const useParamContext = () => useContext<IParamContext>(ParamContext, "ParamContext");
