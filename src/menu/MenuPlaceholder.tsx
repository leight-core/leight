import {FC, ReactNode} from "react";
import {useMenuElementContext} from "./MenuContext";

export interface IMenuPlaceholderProps {
	menu?: ReactNode;
}

export const MenuPlaceholder: FC<IMenuPlaceholderProps> = ({menu}) => {
	const menuElementContext = useMenuElementContext();
	return <>
		{menu ? menu : <div ref={menuElementContext.setElement}/>}
	</>;
};
