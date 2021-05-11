import {FC} from "react";
import {ItemGroupContext} from "./ItemGroupContext";

export interface IItemGroupContextProviderProps {
	prefix: string[]
}

export const ItemGroupContextProvider: FC<IItemGroupContextProviderProps> = ({prefix}) => {
	return (
		<ItemGroupContext.Provider value={{
			prefix,
		}}/>
	);
};
