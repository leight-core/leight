import {Card} from "antd";
import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IListViewProps {
}

/**
 * Common list view used to make a listing.
 */
export const ListView: FC<IListViewProps> = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid("list.title"));
	useMenuContext().useSelect([moduleContext.id + ".list"]);
	return (
		<Card title={<><BackLink/>&nbsp;{moduleContext.t("list.title")}</>}>
			{children}
		</Card>
	);
};
