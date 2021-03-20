import {Card, Result} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IDashboardViewProps {
	title?: string | JSX.Element
	subTitle?: string | JSX.Element
}

/**
 * Common dashboard view usually used on module root (for example on users); to use
 * common view for selected object (for example user by an ID) use HomeView.
 */
export const DashboardView: FC<IDashboardViewProps> = (
	{
		title,
		subTitle,
		children,
	}) => {
	const moduleContext = useModuleContext();
	useMenuContext().useSelect([moduleContext.id + ".dashboard"]);
	return (
		<>
			<Helmet title={moduleContext.tid("dashboard.title")}/>
			<Card title={<><BackLink/>&nbsp;{moduleContext.t("dashboard.title")}</>}>
				<Result
					status={"info"}
					title={title || moduleContext.t("dashboard.title")}
					subTitle={subTitle || moduleContext.t("dashboard.subtitle")}
					icon={moduleContext.icon}
					children={children}
				/>
			</Card>
		</>
	);
};
