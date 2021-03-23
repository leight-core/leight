import {Card} from "antd";
import {FC, ReactNode} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useViewContext} from "./ViewContext";

export interface ICreateViewProps {
	/**
	 * Base translation key used in the view.
	 */
	translation: string
	title?: ReactNode
}

/**
 * Common create view - just to make same shape for all views for creating things.
 *
 * Do some steps like setting application title and selecting menu (setting menu state).
 */
export const CreateView: FC<ICreateViewProps> = ({translation, title, children}) => {
	const {t} = useTranslation();
	const viewContext = useViewContext();
	return (
		<>
			<Helmet title={t(translation + ".create.title")}/>
			<Card title={title || viewContext.title || t(translation + ".create.title")} children={children}/>
		</>
	);
};
