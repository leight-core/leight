import {usePageContext} from "@leight-core/leight";
import {FC} from "react";
import {createPortal} from "react-dom";

export interface IHeaderPortalProps {
}

export const HeaderPortal: FC<IHeaderPortalProps> = ({children}) => {
	const pageContext = usePageContext();
	return pageContext.headerEl ? createPortal(children, pageContext.headerEl) : null;
};
