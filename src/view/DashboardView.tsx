import {Card, Result} from "antd";
import {FC, ReactNode} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useViewContext} from "./ViewContext";

export interface IDashboardViewProps {
	/**
	 * Base translation key.
	 */
	translation: string
	title?: ReactNode
	icon?: ReactNode
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
		children,
	}) => {
	const {t} = useTranslation();
	const viewContext = useViewContext();
	return (
		<>
			<Helmet title={t(translation + ".dashboard.title")}/>
			<Card title={title || viewContext.title || t(translation + ".dashboard.title")}>
				<Result
					status={"info"}
					title={t(translation + ".dashboard.title")}
					subTitle={t(translation + ".dashboard.subtitle")}
					icon={icon}
					children={children}
				/>
			</Card>
		</>
	);
};
