import {FC} from "react";
import {ScrollToTop} from "../component/ScrollToTop";

export interface IPageProps {
	title?: string;
}

export const Page: FC<IPageProps> = ({title, children}) => {
	return <>
		<ScrollToTop/>
		{children}
	</>;
};
