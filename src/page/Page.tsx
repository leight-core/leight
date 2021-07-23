import Head from "next/head";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";

export interface IPageProps {
	title?: string;
}

export const Page: FC<IPageProps> = ({title, children}) => {
	const {t} = useTranslation();
	return <>
		{title && <Head><title key={"title"}>{title ? t(title + ".title") : title}</title></Head>}
		<ScrollToTop/>
		{children}
	</>;
};
