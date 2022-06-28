import {MenuElementContext, MenuSelectionContext} from "@leight-core/leight";
import {FC, PropsWithChildren, useEffect, useState} from "react";

export type IMenuElementProviderProps = PropsWithChildren<{
	defaultElement?: Element;
}>

export const MenuElementProvider: FC<IMenuElementProviderProps> = ({defaultElement, ...props}) => {
	const [element, setElement] = useState<Element | undefined | null>(defaultElement);
	return <MenuElementContext.Provider
		value={{
			element,
			setElement,
		}}
		{...props}
	/>;
};

export type IMenuSelectionProviderProps = PropsWithChildren<{
	defaultSelection?: string[];
}>

export const MenuSelectionProvider: FC<IMenuSelectionProviderProps> = ({defaultSelection = [], ...props}) => {
	const [selection, setSelection] = useState<string[]>(defaultSelection);
	return <MenuSelectionContext.Provider
		value={{
			selection,
			useSelection: selection => {
				useEffect(() => {
					const id = setTimeout(() => setSelection(selection), 0);
					return () => clearTimeout(id);
				}, selection);
			}
		}}
		{...props}
	/>;
};
