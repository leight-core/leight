import {Card} from "antd";
import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IEditView {
}

/**
 * Common edit view.
 */
export const EditView: FC<IEditView> = ({children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid("edit.title"));
	useMenuContext().useSelect([moduleContext.id + ".edit"]);
	return (
		<Card title={<><BackLink/>&nbsp;{moduleContext.t("edit.title")}</>}>
			{children}
		</Card>
	);
};
