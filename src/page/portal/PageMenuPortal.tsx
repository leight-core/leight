import {usePageContext} from "@leight-core/leight";
import {FC, PropsWithChildren} from "react";
import {createPortal} from "react-dom";

export type IPageMenuPortalProps = PropsWithChildren;

export const PageMenuPortal: FC<IPageMenuPortalProps> = ({children}) => {
	const pageContext = usePageContext();
	return pageContext.menuEl ? createPortal(children, pageContext.menuEl) : null;
};
