import {FC, useState} from "react";
import {BlockContext} from "./BlockContext";
import {BlockContextClass} from "./BlockContextClass";

export interface IBlockContextProviderProps {
	/**
	 * Default blocking state; "false" if not specified.
	 */
	locked?: boolean
}

export const BlockContextProvider: FC<IBlockContextProviderProps> = ({locked = false, children}) => {
	return (
		<BlockContext.Provider
			value={new BlockContextClass(useState<boolean>(locked), useState<number>(0))}
			children={children}
		/>
	);
};
