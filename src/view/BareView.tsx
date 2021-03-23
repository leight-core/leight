import {Card} from "antd";
import {FC, ReactNode} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useViewContext} from "./ViewContext";

export interface IBareViewProps {
	/**
	 * Translation key for the bare view,
	 */
	translation: string
	title?: ReactNode
}

/**
 * Bare view do almost noting extra - just selects menu and sets page title.
 *
 * This should be good starting point for very custom views.
 */
export const BareView: FC<IBareViewProps> = ({translation, title, children}) => {
	const {t} = useTranslation();
	const viewContext = useViewContext();
	return (
		<>
			<Helmet title={t(translation + ".title")}/>
			<Card title={title || viewContext.title || t(translation + ".title")} children={children}/>
		</>
	);
};
