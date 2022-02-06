import {FC} from "react";
import {useMenuElementContext} from "./MenuContext";

export interface IMenuPlaceholderProps {
}

export const MenuPlaceholder: FC<IMenuPlaceholderProps> = () => {
	return <div ref={useMenuElementContext().setElement}/>;
};
