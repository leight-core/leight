import {FC} from "react";
import {usePageContext} from "./PageContext";

export interface IPageHeaderProps {
}

export const PageHeader: FC<IPageHeaderProps> = () => {
	return <div ref={usePageContext().setHeaderEl}/>;
};
