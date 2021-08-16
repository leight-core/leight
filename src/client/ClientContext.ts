import {IClientContext, useContext} from "@leight-core/leight";
import {createContext} from "react";

export const ClientContext = createContext(null as unknown as IClientContext);

/**
 * Client-side configuration context (usually loaded from server).
 */
export const useClientContext = () => useContext(ClientContext, "ClientContext");
