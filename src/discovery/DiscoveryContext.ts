import {IDiscoveryContext, useContext, useOptionalContext} from "@leight-core/leight";
import {createContext} from "react";

export const DiscoveryContext = createContext(null as unknown as IDiscoveryContext);

/**
 * Discovery context contains methods used to generate links to backend; it's usually loaded
 * from server.
 */
export const useDiscoveryContext = () => useContext<IDiscoveryContext>(DiscoveryContext, "DiscoveryContext");

export const useOptionalDiscoveryContext = () => useOptionalContext<IDiscoveryContext>(DiscoveryContext as any);
