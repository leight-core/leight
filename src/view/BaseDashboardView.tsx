import {Card, Result} from "antd";
import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IBaseDashboardView {
	title: string | JSX.Element
	subTitle: string | JSX.Element
}

export const BaseDashboardView: FC<IBaseDashboardView> = (
	{
		title = null,
		subTitle = null,
		children,
	}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid(".create.title"));
	useLayoutContext().useMenuSelect([moduleContext.id + ".dashboard"]);
	return (
		<Card title={<BackLink/>}>
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
