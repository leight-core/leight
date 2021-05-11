import {FC} from "react";
import {ItemGroupContext} from "./ItemGroupContext";

export interface IItemGroupContextProviderProps {
	prefix: (string | number)[]
}

export const ItemGroupContextProvider: FC<IItemGroupContextProviderProps> = ({prefix, children}) => {
	return (
		<ItemGroupContext.Provider
			value={{
				prefix,
			}}
			children={children}
		/>
	);
};
