import {ItemGroupContext} from "@leight-core/leight";
import {FC} from "react";

export interface IItemGroupContextProviderProps {
	prefix: (string | number)[];
	translation?: string;
}

export const ItemGroupContextProvider: FC<IItemGroupContextProviderProps> = ({prefix, translation, ...props}) => {
	return <ItemGroupContext.Provider
		value={{
			prefix,
			translation,
		}}
		{...props}
	/>;
};
