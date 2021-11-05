import {FC} from "react";
import {usePageContext} from "../PageContext";

export interface IPageBreadcrumbProps {
}

export const PageBreadcrumb: FC<IPageBreadcrumbProps> = () => {
	return <div ref={usePageContext().setBreadcrumbEl}/>;
};
