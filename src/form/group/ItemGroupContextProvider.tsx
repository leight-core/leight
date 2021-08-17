import {ItemGroupContext} from "@leight-core/leight";
import {FC} from "react";

export interface IItemGroupContextProviderProps {
	prefix: (string | number)[];
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
