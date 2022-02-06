import {MenuCollapseContext, MenuElementContext, MenuSelectionContext} from "@leight-core/leight";
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

export interface IMenuCollapseProviderProps {
	defaultCollapsed?: boolean;
}

export const MenuCollapseProvider: FC<IMenuCollapseProviderProps> = ({defaultCollapsed = false, ...props}) => {
	const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed);
	return <MenuCollapseContext.Provider
		value={{
			collapsed,
			useCollapse: (collapsed, restore) => {
				useEffect(() => {
					setCollapsed(collapsed);
					return () => {
						restore && setCollapsed(!collapsed);
					};
				}, [collapsed]);
			},
			setCollapsed,
		}}
		{...props}
	/>;
};
