import {useDrawerContext} from "@leight-core/leight";
import {Drawer as CoolDrawer, DrawerProps} from "antd";
import {FC} from "react";

export interface IDrawerProps extends Partial<DrawerProps> {
}

/**
 * Drawer controlled by a DrawerContext.
 */
export const Drawer: FC<IDrawerProps> = (props) => {
	const drawerContext = useDrawerContext();
	return <CoolDrawer
		placement={"right"}
		closable
		onClose={() => drawerContext.setVisible(false)}
		visible={drawerContext.visible}
		children={drawerContext.content}
		width={drawerContext.width}
		destroyOnClose
		{...props}
	/>;
};
