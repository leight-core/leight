import {Card} from "antd";
import {FC, ReactNode} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useViewContext} from "./ViewContext";

export interface IEditViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
	title?: ReactNode
}

/**
 * Common edit view.
 */
export const EditView: FC<IEditViewProps> = ({translation, title, children}) => {
	const {t} = useTranslation();
	const viewContext = useViewContext();
	return (
		<>
			<Helmet title={t(translation + ".edit.title")}/>
			<Card title={title || viewContext.title || t(translation + ".edit.title")} children={children}/>
		</>
	);
};
