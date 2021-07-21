import {FC} from "react";
import {ScrollToTop} from "../component/ScrollToTop";

export interface IPageProps {
}

export const Page: FC<IPageProps> = ({children}) => {
	return <>
		<ScrollToTop/>
		{children}
	</>;
};
