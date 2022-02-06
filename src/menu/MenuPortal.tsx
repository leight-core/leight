import {FC} from "react";
import {createPortal} from "react-dom";
import {useMenuElementContext} from "./MenuContext";

export interface IMenuPortalProps {
}

export const MenuPortal: FC<IMenuPortalProps> = ({children}) => {
	const menuElementContext = useMenuElementContext();
	return menuElementContext.element ? createPortal(children, menuElementContext.element) : null;
};
