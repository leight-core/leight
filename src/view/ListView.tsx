import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";

export interface IListViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
}

/**
 * Common list view used to make a listing.
 */
export const ListView: FC<IListViewProps> = ({translation, children}) => {
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t(translation + ".list.title")}/>
			<Card title={<><BackLink/>&nbsp;{t(translation + ".list.title")}</>}>
				{children}
			</Card>
		</>
	);
};
