import {isEqual, MenuContext} from "@leight-core/leight";
import {FC, useEffect, useState} from "react";

export interface IMenuContextProviderProps {
}

export const MenuContextProvider: FC<IMenuContextProviderProps> = ({children}) => {
	const [current, setCurrent] = useState<string[]>([]);
	const [collapsed, setCollapse] = useState<boolean>(false);
	const [element, setElement] = useState<Element | undefined | null>(null);
	return <MenuContext.Provider
		value={{
			collapsed,
			setCollapse,
			useCollapse: (collapse, restore = false) => {
				useEffect(() => {
					setCollapse(collapse);
					return () => {
						restore && setCollapse(!collapse);
					};
				}, [collapse]);
			},
			current,
			useSelect: select => useEffect(() => {
				const id = setTimeout(() => !isEqual(select, current) && setCurrent(select), 0);
				return () => clearTimeout(id);
			}, []),
			element,
			setElement,
		}}
	>
		{children}
	</MenuContext.Provider>;
};
