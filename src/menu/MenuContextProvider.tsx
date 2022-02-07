import {MenuElementContext, MenuSelectionContext} from "@leight-core/leight";
import {FC, useEffect, useState} from "react";

export interface IMenuElementProviderProps {
	defaultElement?: Element;
}

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

export interface IMenuSelectionProviderProps {
	defaultSelection?: string[];
}

export const MenuSelectionProvider: FC<IMenuSelectionProviderProps> = ({defaultSelection = [], ...props}) => {
	const [selection, setSelection] = useState<string[]>(defaultSelection);
	return <MenuSelectionContext.Provider
		value={{
			selection,
			useSelection: selection => {
				useEffect(() => {
					setSelection(selection);
				}, selection);
			}
		}}
		{...props}
	/>;
};
