import equal from "fast-deep-equal";
import {FC, ReactNode, useEffect, useRef, useState} from "react";
import {MenuContext} from "./MenuContext";

export interface IMenuProviderProps {
}

export const MenuProvider: FC<IMenuProviderProps> = ({children}) => {
	const [current, setCurrent] = useState<string[]>([]);
	const [menu, setMenu] = useState<ReactNode>(null);
	const menuKey = useRef<string | undefined>();
	return (
		<MenuContext.Provider
			value={{
				menu,
				current,
				useSelect: select => useEffect(() => {
					const id = setTimeout(() => !equal(select, current) && setCurrent(select), 0);
					return () => clearTimeout(id);
				}, []),
				useMenu: (menu, name) => useEffect(() => {
					if (!name) {
						setMenu(menu);
						menuKey.current = undefined;
					}
					if (name && menuKey.current !== name) {
						setMenu(menu);
						menuKey.current = name;
					}
				}, [name]),
				setMenu,
			}}
			children={children}
		/>
	);
};
