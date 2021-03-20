import {Card, Result} from "antd";
import {FC, ReactNode} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";

export interface IDashboardViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
	icon?: ReactNode
	title?: ReactNode
	subTitle?: ReactNode
}

/**
 * Common dashboard view usually used on module root (for example on users); to use
 * common view for selected object (for example user by an ID) use HomeView.
 */
export const DashboardView: FC<IDashboardViewProps> = (
	{
		translation,
		icon,
		title,
		subTitle,
		children,
	}) => {
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t(translation + ".dashboard.title")}/>
			<Card title={<><BackLink/>&nbsp;{t(translation + ".dashboard.title")}</>}>
				<Result
					status={"info"}
					title={title || t(translation + ".dashboard.title")}
					subTitle={subTitle || t(translation + ".dashboard.subtitle")}
					icon={icon}
					children={children}
				/>
			</Card>
		</>
	);
};
