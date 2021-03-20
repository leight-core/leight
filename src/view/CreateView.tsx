import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";

export interface ICreateViewProps {
	/**
	 * Base translation key used in the view.
	 */
	translation: string
}

/**
 * Common create view - just to make same shape for all views for creating things.
 *
 * Do some steps like setting application title and selecting menu (setting menu state).
 */
export const CreateView: FC<ICreateViewProps> = ({translation, children}) => {
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t(translation + ".create.title")}/>
			<Card title={<><BackLink/>&nbsp;{t(translation + ".create.title")}</>}>
				{children}
			</Card>
		</>
	);
};
