import {Card} from "antd";
import Head from "next/head";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";
import {UpdatePageHeader} from "../layout/UpdatePageHeader";

export interface IPageProps {
	/**
	 * Optional header (if used, UpdateHeader component will be executed).
	 */
	header?: ReactNode;
	/**
	 * The page title (main title); it goes through translation.
	 */
	h1: string;
	/**
	 * If provided, page title will be updated (tab name). Must be explicitly provided to change a title.
	 */
	title?: string;
}

export const Page: FC<IPageProps> = ({header, title, h1, children}) => {
	const {t} = useTranslation();
	return <>
		{header && <UpdatePageHeader>
			{header}
		</UpdatePageHeader>}
		{title && <Head><title key={"title"}>{title ? t(title + ".title") : title}</title></Head>}
		<ScrollToTop/>
		<Card title={t(h1)}>
			{children}
		</Card>
	</>;
};
