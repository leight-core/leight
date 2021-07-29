import {DependencyList, FC, useEffect} from "react";
import {useMenuContext} from "./MenuContext";

export interface IUpdateMenuProps {
	deps?: DependencyList;
}

export const UpdateMenu: FC<IUpdateMenuProps> = ({deps = [], children}) => {
	const menuContext = useMenuContext();
	useEffect(() => {
		children && menuContext.setMenu(children);
	}, deps);
	return null;
};
