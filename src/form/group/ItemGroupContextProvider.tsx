import {ItemGroupContext} from "@leight-core/leight";
import {FC, PropsWithChildren} from "react";

export type IItemGroupContextProviderProps = PropsWithChildren<{
	prefix: (string | number)[];
	translation?: string;
}>;

export const ItemGroupContextProvider: FC<IItemGroupContextProviderProps> = ({prefix, translation, ...props}) => {
	return <ItemGroupContext.Provider
		value={{
			prefix,
			translation,
		}}
		{...props}
	/>;
};
