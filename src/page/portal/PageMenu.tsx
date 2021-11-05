import {FC} from "react";
import {usePageContext} from "../PageContext";

export interface IPageMenuProps {
}

export const PageMenu: FC<IPageMenuProps> = () => {
	return <div ref={usePageContext().setMenuEl}/>;
};
