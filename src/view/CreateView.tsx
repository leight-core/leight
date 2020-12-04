import {Card} from "antd";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";

/**
 * Common create view - just to make same shape for all views for creating things.
 *
 * Do some steps like setting application title and selecting menu (setting menu state).
 */
export const CreateView = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid(".create.title"));
	useLayoutContext().useMenuSelect([moduleContext.id + ".create"]);
	return (
		<Card title={<BackLink/>}>
			{children}
		</Card>
	);
};
