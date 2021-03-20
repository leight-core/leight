import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";

export interface IHomeViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
}

/**
 * Common home view - just to make same shape for all views for showing home of things.
 */
export const HomeView: FC<IHomeViewProps> = ({translation, children}) => {
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t(translation + ".home.title")}/>
			<Card title={<><BackLink/>&nbsp;{t(translation + ".home.title")}</>}>
				{children}
			</Card>
		</>
	);
};
