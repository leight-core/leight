import {usePageContext} from "@leight-core/leight";
import {FC} from "react";

export interface IPageBreadcrumbProps {
}

export const PageBreadcrumb: FC<IPageBreadcrumbProps> = () => {
	return <div ref={usePageContext().setBreadcrumbEl}/>;
};
