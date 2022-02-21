import {useMenuElementContext} from "@leight-core/leight";
import {FC, ReactNode} from "react";

export interface IMenuPlaceholderProps {
	menu?: ReactNode;
}

export const MenuPlaceholder: FC<IMenuPlaceholderProps> = ({menu}) => {
	const menuElementContext = useMenuElementContext();
	return <>
		{menu ? menu : <div ref={menuElementContext.setElement}/>}
	</>;
};
