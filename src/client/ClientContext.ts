import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IClientContext} from "./interface";

export const ClientContext = createContext(null as unknown as IClientContext);

/**
 * Client-side configuration context (usually loaded from server).
 */
export const useClientContext = () => useContext(ClientContext, "ClientContext");
