import {MenuContext} from "@leight-core/leight";
import equal from "fast-deep-equal/es6/react";
import {FC, ReactNode, useEffect, useRef, useState} from "react";

export interface IMenuProviderProps {
}

export const MenuProvider: FC<IMenuProviderProps> = ({children}) => {
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
				const id = setTimeout(() => !equal(select, current) && setCurrent(select), 0);
				return () => clearTimeout(id);
			}, []),
			useMenu: (menu, name) => useEffect(() => {
				if (!menu) {
					return;
				}
				if (!name) {
					setMenu(menu);
					menuKey.current = undefined;
				}
				if (name && menuKey.current !== name) {
					setMenu(menu);
					menuKey.current = name;
				}
			}, []),
			setMenu,
		}}
	>
		{children}
	</MenuContext.Provider>;
};
