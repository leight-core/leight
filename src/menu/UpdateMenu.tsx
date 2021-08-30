import {useMenuContext} from "@leight-core/leight";
import {DependencyList, FC, useEffect} from "react";

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
