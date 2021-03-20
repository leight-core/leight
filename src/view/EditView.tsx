import {Card} from "antd";
import {FC} from "react";
import {Helmet} from "react-helmet";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IEditViewProps {
}

/**
 * Common edit view.
 */
export const EditView: FC<IEditViewProps> = ({children}) => {
	const moduleContext = useModuleContext();
	useMenuContext().useSelect([moduleContext.id + ".edit"]);
	return (
		<>
			<Helmet title={moduleContext.tid("edit.title")}/>
			<Card title={<><BackLink/>&nbsp;{moduleContext.t("edit.title")}</>}>
				{children}
			</Card>
		</>
	);
};
