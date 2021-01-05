import {Card} from "antd";
import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface IBareViewProps {
	/**
	 * Name uses internally module prefix
	 */
	name: string
}

/**
 * Bare view do almost noting extra - just selects menu and sets page title.
 *
 * This should be good starting point for very custom views.
 */
export const BareView: FC<IBareViewProps> = ({name, children}) => {
	const moduleContext = useModuleContext();
	useAppContext().useTitle(moduleContext.tid(name + ".title"));
	useMenuContext().useSelect([moduleContext.id + "." + name]);
	return (
		<Card title={<><BackLink/>&nbsp;{moduleContext.t(name + ".title")}</>}>
			{children}
		</Card>
	);
};
