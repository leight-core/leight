import {Card} from "antd";
import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IHomeView {
}

/**
 * Common home view - just to make same shape for all views for showing home of things.
 */
export const HomeView: FC<IHomeView> = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid("home.title"));
	useMenuContext().useSelect([moduleContext.id + ".home"]);
	return (
		<Card title={<><BackLink/>&nbsp;{moduleContext.t("home.title")}</>}>
			{children}
		</Card>
	);
};
