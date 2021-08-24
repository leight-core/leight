import {IFingerprintContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const FingerprintContext = createContext(null as unknown as IFingerprintContext);

export const useFingerprintContext = () => useContext(FingerprintContext, "FingerprintContext");
