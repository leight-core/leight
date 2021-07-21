import {createContext} from "react";
import {useContext} from "../utils/useContext";
import {IDiscoveryContext} from "./interface";

export const DiscoveryContext = createContext(null as unknown as IDiscoveryContext);

/**
 * Discovery context contains methods used to generate links to backend; it's usually loaded
 * from server.
 */
export const useDiscoveryContext = () => useContext<IDiscoveryContext>(DiscoveryContext, "DiscoveryContext");
