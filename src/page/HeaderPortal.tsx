import {usePageContext} from "@leight-core/leight";
import {FC} from "react";
import {createPortal} from "react-dom";

export interface IHeaderPortalProps {
}

export const HeaderPortal: FC<IHeaderPortalProps> = ({children}) => {
	const pageContext = usePageContext();
	if (!pageContext.headerEl) {
		throw new Error("Cannot use HeaderPortal, because PageContext does not have any 'headerRef' specified. You can use <PageHeader/> component (before usage of HeaderPortal) which provides automatic support for HeaderPortal.");
	}
	return createPortal(children, pageContext.headerEl);
};
