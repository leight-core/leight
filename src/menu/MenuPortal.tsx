import {FC} from "react";
import {createPortal} from "react-dom";
import {useMenuContext} from "./MenuContext";

export interface IMenuPortalProps {
}

export const MenuPortal: FC<IMenuPortalProps> = ({children}) => {
	const menuContext = useMenuContext();
	return menuContext.element ? createPortal(children, menuContext.element) : null;
};
