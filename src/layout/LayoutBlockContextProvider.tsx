import {FC, useState} from "react";
import {BlockContextClass} from "../block/BlockContextClass";
import {IBlockContextProviderProps} from "../block/BlockContextProvider";
import {LayoutBlockContext} from "./LayoutBlockContext";

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
