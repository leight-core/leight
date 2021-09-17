import {BlockContextClass, IBlockContextProviderProps, LayoutBlockContext} from "@leight-core/leight";
import {FC, useState} from "react";

export interface ILayoutBlockContextProviderProps extends Partial<IBlockContextProviderProps> {
	/**
	 * Default blocking state; "false" if not specified.
	 */
	locked?: boolean;
}

export const LayoutBlockContextProvider: FC<ILayoutBlockContextProviderProps> = ({locked = false, ...props}) => {
	return <LayoutBlockContext.Provider
		value={new BlockContextClass(useState<boolean>(locked), useState<number>(0))}
		{...props}
	/>;
};
