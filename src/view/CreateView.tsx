import {Card} from "antd";
import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {BackLink} from "../component/BackLink";
import {useMenuContext} from "../menu/MenuContext";
import {useModuleContext} from "../module/ModuleContext";

export interface ICreateView {
}

/**
 * Common create view - just to make same shape for all views for creating things.
 *
 * Do some steps like setting application title and selecting menu (setting menu state).
 */
export const CreateView: FC<ICreateView> = ({children}) => {
    const moduleContext = useModuleContext();
    useAppContext().useTitle(moduleContext.tid("create.title"));
    useMenuContext().useSelect([moduleContext.id + ".create"]);
    return (
        <Card title={<><BackLink/>&nbsp;{moduleContext.t("create.title")}</>}>
            {children}
        </Card>
    );
};
