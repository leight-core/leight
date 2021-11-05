import {FC} from "react";
import {usePageContext} from "./PageContext";

export interface IPageHeaderProps {
}

export const PageHeader: FC<IPageHeaderProps> = () => {
	const pageContext = usePageContext();
	return <div ref={pageContext.headerRef}/>;
};
