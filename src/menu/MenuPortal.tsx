import {useMenuElementContext} from "@leight-core/leight";
import {FC, PropsWithChildren} from "react";
import {createPortal} from "react-dom";

export type IMenuPortalProps = PropsWithChildren;

export const MenuPortal: FC<IMenuPortalProps> = ({children}) => {
	const menuElementContext = useMenuElementContext();
	return menuElementContext.element ? createPortal(children, menuElementContext.element) : null;
};
