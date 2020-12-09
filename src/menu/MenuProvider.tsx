import {FC, useEffect, useState} from "react";
import {MenuContext} from "./MenuContext";

export interface IMenuProvider {
	defaultMenu: JSX.Element
}

export const MenuProvider: FC<IMenuProvider> = ({defaultMenu, children}) => {
	const [current, setCurrent] = useState<string[]>([]);
	const [menu, setMenu] = useState<JSX.Element>(defaultMenu);
	return (
		<MenuContext.Provider
			value={{
				menu,
				current,
				useSelect: select => useEffect(() => {
					const id = setTimeout(() => setCurrent(select), 0);
					return () => clearTimeout(id);
				}, []),
				useMenu: menu => useEffect(() => setMenu(menu), []),
			}}
			children={children}
		/>
	);
};
