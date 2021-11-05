import {usePageContext} from "@leight-core/leight";
import {FC} from "react";
import {createPortal} from "react-dom";

export interface IBreadcrumbPortalProps {
}

export const BreadcrumbPortal: FC<IBreadcrumbPortalProps> = ({children}) => {
	const pageContext = usePageContext();
	return pageContext.breadcrumbEl ? createPortal(children, pageContext.breadcrumbEl) : null;
};
