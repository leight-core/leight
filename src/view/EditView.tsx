import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";

export interface IEditViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
}

/**
 * Common edit view.
 */
export const EditView: FC<IEditViewProps> = ({translation, children}) => {
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t(translation + ".edit.title")}/>
			<Card title={<><BackLink/>&nbsp;{t(translation + ".edit.title")}</>}>
				{children}
			</Card>
		</>
	);
};
