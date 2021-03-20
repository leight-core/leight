import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";

export interface IBareViewProps {
	/**
	 * Translation key for the bare view,
	 */
	translation: string
}

/**
 * Bare view do almost noting extra - just selects menu and sets page title.
 *
 * This should be good starting point for very custom views.
 */
export const BareView: FC<IBareViewProps> = ({translation, children}) => {
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t(translation + ".title")}/>
			<Card title={<><BackLink/>&nbsp;{t(translation + ".title")}</>}>
				{children}
			</Card>
		</>
	);
};
