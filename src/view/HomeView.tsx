import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IHomeViewProps {
}

/**
 * Common home view - just to make same shape for all views for showing home of things.
 */
export const HomeView: FC<IHomeViewProps> = ({children}) => {
	const moduleContext = useModuleContext();
	useMenuContext().useSelect([moduleContext.id + ".home"]);
	return (
		<>
			<Helmet title={moduleContext.tid("home.title")}/>
			<Card title={<><BackLink/>&nbsp;{moduleContext.t("home.title")}</>}>
				{children}
			</Card>
		</>
	);
};
