import {FC, useState} from "react";
import {DiscoveryContext} from "./DiscoveryContext";
import {DiscoveryContextClass} from "./DiscoveryContextClass";
import {IDiscovery} from "./interface";

export interface IDiscoveryContextProviderProps {
}

export const DiscoveryContextProvider: FC<IDiscoveryContextProviderProps> = ({children}) => {
	return (
		<DiscoveryContext.Provider
			value={new DiscoveryContextClass(useState<IDiscovery>())}
			children={children}
		/>
	);
};
