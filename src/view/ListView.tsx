import {Card} from "antd";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";

/**
 * Common list view used to make a listing.
 */
export const ListView = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid(".list.title"));
	useLayoutContext().useMenuSelect([moduleContext.id + ".list"]);
	return (
		<Card title={<BackLink/>}>
			{children}
		</Card>
	);
};
