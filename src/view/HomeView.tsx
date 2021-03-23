import {Card} from "antd";
import {FC, ReactNode} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useViewContext} from "./ViewContext";

export interface IHomeViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
	title?: ReactNode
}

/**
 * Common home view - just to make same shape for all views for showing home of things.
 */
export const HomeView: FC<IHomeViewProps> = ({translation, title, children}) => {
	const {t} = useTranslation();
	const viewContext = useViewContext();
	return (
		<>
			<Helmet title={t(translation + ".home.title")}/>
			<Card title={title || viewContext.title || t(translation + ".home.title")} children={children}/>
		</>
	);
};
