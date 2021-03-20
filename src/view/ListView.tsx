import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
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
	useMenuContext().useSelect([moduleContext.id + ".list"]);
	return (
		<>
			<Helmet title={moduleContext.tid("list.title")}/>
			<Card title={<><BackLink/>&nbsp;{moduleContext.t("list.title")}</>}>
				{children}
			</Card>
		</>
	);
};
