import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface ICreateViewProps {
}

/**
 * Common create view - just to make same shape for all views for creating things.
 *
 * Do some steps like setting application title and selecting menu (setting menu state).
 */
export const CreateView: FC<ICreateViewProps> = ({children}) => {
	const moduleContext = useModuleContext();
	useMenuContext().useSelect([moduleContext.id + ".create"]);
	return (
		<>
			<Helmet title={moduleContext.tid("create.title")}/>
			<Card title={<><BackLink/>&nbsp;{moduleContext.t("create.title")}</>}>
				{children}
			</Card>
		</>
	);
};
