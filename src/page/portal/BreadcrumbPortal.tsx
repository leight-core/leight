import {usePageContext} from "@leight-core/leight";
import {FC, PropsWithChildren} from "react";
import {createPortal} from "react-dom";

export type IBreadcrumbPortalProps = PropsWithChildren;

export const BreadcrumbPortal: FC<IBreadcrumbPortalProps> = ({children}) => {
	const pageContext = usePageContext();
	return pageContext.breadcrumbEl ? createPortal(children, pageContext.breadcrumbEl) : null;
};
