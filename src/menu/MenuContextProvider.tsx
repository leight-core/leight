import {isEqual, MenuContext} from "@leight-core/leight";
import {FC, ReactNode, useEffect, useRef, useState} from "react";

export interface IMenuContextProviderProps {
}

export const MenuContextProvider: FC<IMenuContextProviderProps> = ({children}) => {
	const [current, setCurrent] = useState<string[]>([]);
	const [menu, setMenu] = useState<ReactNode>(null);
	const [collapsed, setCollapse] = useState<boolean>(false);
	const menuKey = useRef<string | undefined>();
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
			menu,
			current,
			useSelect: select => useEffect(() => {
				const id = setTimeout(() => !isEqual(select, current) && setCurrent(select), 0);
				return () => clearTimeout(id);
			}, []),
			useMenu: (menu, name) => useEffect(() => {
				if (!menu) {
					return;
				}
				if (!name) {
					setMenu(menu());
					menuKey.current = undefined;
				}
				if (name && menuKey.current !== name) {
					setMenu(menu());
					menuKey.current = name;
				}
			}, [name]),
			setMenu: menu => {
				setMenu(menu);
				menuKey.current = undefined;
			},
		}}
	>
		{children}
	</MenuContext.Provider>;
};
