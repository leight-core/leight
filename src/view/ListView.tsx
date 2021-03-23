import {Card} from "antd";
import {FC, ReactNode} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useViewContext} from "./ViewContext";

export interface IListViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
	title?: ReactNode
}

/**
 * Common list view used to make a listing.
 */
export const ListView: FC<IListViewProps> = ({translation, title, children}) => {
	const {t} = useTranslation();
	const viewContext = useViewContext();
	return (
		<>
			<Helmet title={t(translation + ".list.title")}/>
			<Card title={title || viewContext.title || t(translation + ".list.title")} children={children}/>
		</>
	);
};
