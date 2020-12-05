import {Card, Result} from "antd";
import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IDashboardView {
	title?: string | JSX.Element
	subTitle?: string | JSX.Element
}

/**
 * Common dashboard view usually used on module root (for example on users); to use
 * common view for selected object (for example user by an ID) use HomeView.
 */
export const DashboardView: FC<IDashboardView> = (
	{
		title,
		subTitle,
		children,
	}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid("dashboard.title"));
	useLayoutContext().useMenuSelect([moduleContext.id + ".dashboard"]);
	return (
		<Card title={<BackLink text={moduleContext.tid("dashboard.title")}/>}>
			<Result
				status={"info"}
				title={title || moduleContext.t("dashboard.title")}
				subTitle={subTitle || moduleContext.t("dashboard.subtitle")}
				icon={moduleContext.icon}
				children={children}
			/>
		</Card>
	);
};
