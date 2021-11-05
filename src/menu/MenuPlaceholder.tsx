import {FC} from "react";
import {useMenuContext} from "./MenuContext";

export interface IMenuPlaceholderProps {
}

export const MenuPlaceholder: FC<IMenuPlaceholderProps> = () => {
	return <div ref={useMenuContext().setElement}/>;
};
