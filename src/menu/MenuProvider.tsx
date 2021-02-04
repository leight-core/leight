import {FC, ReactNode, useEffect, useState} from "react";
import {MenuContext} from "./MenuContext";

export interface IMenuProviderProps {
}

export const MenuProvider: FC<IMenuProviderProps> = ({children}) => {
	const [current, setCurrent] = useState<string[]>([]);
	const [menu, setMenu] = useState<ReactNode>(null);
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
