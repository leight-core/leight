import Head from "next/head";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";
import {UpdatePageHeader} from "../layout/UpdatePageHeader";

export interface IEmptyPageProps {
	/**
	 * Optional header (if used, UpdateHeader component will be executed).
	 */
	header?: ReactNode;
	/**
	 * If provided, page title will be updated (tab name). Must be explicitly provided to change a title.
	 */
	title?: string;
}

/**
 * Quite simple empty page without any additional features.
 */
export const EmptyPage: FC<IEmptyPageProps> = ({header, title, children}) => {
	const {t} = useTranslation();
	return <>
		{header && <UpdatePageHeader>
			{header}
		</UpdatePageHeader>}
		{title && <Head><title key={"title"}>{title ? t(title + ".title") : title}</title></Head>}
		<ScrollToTop/>
		{children}
	</>;
};
