import {Card} from "antd";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";

/**
 * Common edit view.
 */
export const EditView = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid(".edit.title"));
	useLayoutContext().useMenuSelect([moduleContext.id + ".edit"]);
	return (
		<Card title={<BackLink/>}>
			{children}
		</Card>
	);
};
