import {FC} from "react";
import {ScrollToTop} from "../component/ScrollToTop";
import {Title} from "../layout/Title";

export interface IPageProps {
	title?: string;
}

export const Page: FC<IPageProps> = ({title, children}) => {
	return <>
		<Title title={title ? title + ".title" : title}/>
		<ScrollToTop/>
		{children}
	</>;
};
