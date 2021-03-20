import isEqual from "is-equal";
import {FC, ReactNode, useEffect, useRef, useState} from "react";
import {useForceUpdate} from "../hook/useForceUpdate";
import {IParams} from "../interface/interface";
import {MenuContext} from "./MenuContext";

export interface IMenuProviderProps {
}

export const MenuProvider: FC<IMenuProviderProps> = ({children}) => {
	const [current, setCurrent] = useState<string[]>([]);
	const [params, setParams] = useState<IParams>({});
	const [menu, setMenu] = useState<ReactNode>(null);
	const reload = useForceUpdate();
	const menuKey = useRef<string | undefined>();
	return (
		<MenuContext.Provider
			value={{
				params,
				/**
				 * Update params just when they're different. This will prevent unnecessary redraws.
				 */
				setParams: (values, update = false) => {
					!isEqual(params, values) && setParams(values);
					update && reload();
				},
				menu,
				current,
				useSelect: select => useEffect(() => {
					const id = setTimeout(() => {
						console.log(`setting current items`);
						// !isEqual(select, current) && setCurrent(select);
					}, 0);
					return () => clearTimeout(id);
				}, []),
				useMenu: (menu, name) => useEffect(() => {
					!name && setMenu(menu);
					if (name && menuKey.current !== name) {
						setMenu(menu);
						menuKey.current = name;
					}
				}, [name]),
				setMenu,
				reload,
			}}
			children={children}
		/>
	);
};
