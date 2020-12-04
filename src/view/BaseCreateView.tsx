import {Card} from "antd";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";

export const BaseCreateView = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid(".create.title"));
	useLayoutContext().useMenuSelect([moduleContext.id + ".create"]);
	return (
		<Card title={<BackLink/>}>
			{children}
		</Card>
	);
};
