import {useMenuSelectionContext, useSiderCollapseContext} from "@leight-core/leight";
import {Menu as CoolMenu, MenuProps} from "antd";
import React, {FC} from "react";

export interface IMenuProps extends Partial<MenuProps> {
	extraOpenKeys?: string[];
}

export const Menu: FC<IMenuProps> = ({extraOpenKeys = [], ...props}) => {
	const menuSelectionContext = useMenuSelectionContext();
	const menuCollapseContext = useSiderCollapseContext();
	return <CoolMenu
		mode={"inline"}
		selectable={true}
		selectedKeys={menuSelectionContext.selection}
		defaultOpenKeys={extraOpenKeys}
		subMenuCloseDelay={0.35}
		inlineCollapsed={menuCollapseContext.collapsed}
		{...props}
	/>;
};
