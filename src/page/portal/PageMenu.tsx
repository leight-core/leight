import {usePageContext} from "@leight-core/leight";
import {FC} from "react";

export interface IPageMenuProps {
}

export const PageMenu: FC<IPageMenuProps> = () => {
	return <div ref={usePageContext().setMenuEl}/>;
};
