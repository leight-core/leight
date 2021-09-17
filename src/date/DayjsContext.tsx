import {useContext} from "@leight-core/leight";
import {createContext} from "react";
import {IDayJsContext} from "./interface";

export const DayjsContext = createContext<IDayJsContext>(null as unknown as IDayJsContext);

export const useDayjsContext = () => useContext<IDayJsContext>(DayjsContext, "DayjsContext");
