import {Card} from "antd";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";

/**
 * Common home view - just to make same shape for all views for showing home of things.
 */
export const HomeView = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid(".home.title"));
	useLayoutContext().useMenuSelect([moduleContext.id + ".home"]);
	return (
		<Card title={<BackLink/>}>
			{children}
		</Card>
	);
};
