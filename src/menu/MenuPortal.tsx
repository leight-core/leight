import {useMenuElementContext} from "@leight-core/leight";
import {FC} from "react";
import {createPortal} from "react-dom";

export interface IMenuPortalProps {
}

export const MenuPortal: FC<IMenuPortalProps> = ({children}) => {
	const menuElementContext = useMenuElementContext();
	return menuElementContext.element ? createPortal(children, menuElementContext.element) : null;
};
