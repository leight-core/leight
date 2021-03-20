import {FC, ReactNode, useEffect, useRef, useState} from "react";
import {MenuContext} from "./MenuContext";

export interface IMenuProviderProps {
}

export const MenuProvider: FC<IMenuProviderProps> = ({children}) => {
	const [current, setCurrent] = useState<string[]>([]);
	const params = useRef();
	const [menu, setMenu] = useState<ReactNode>(null);
	return (
		<MenuContext.Provider
			value={{
				params,
				setParams: value => params.current = value,
				menu,
				current,
				useSelect: select => useEffect(() => {
					const id = setTimeout(() => setCurrent(select), 0);
					return () => clearTimeout(id);
				}, []),
				useMenu: (menu) => useEffect(() => setMenu(menu), []),
				setMenu,
			}}
			children={children}
		/>
	);
};
