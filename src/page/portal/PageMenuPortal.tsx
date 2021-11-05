import {usePageContext} from "@leight-core/leight";
import {FC} from "react";
import {createPortal} from "react-dom";

export interface IPageMenuPortalProps {
}

export const PageMenuPortal: FC<IPageMenuPortalProps> = ({children}) => {
	const pageContext = usePageContext();
	return pageContext.menuEl ? createPortal(children, pageContext.menuEl) : null;
};
