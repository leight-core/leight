import {useMenuCollapseContext, useMenuSelectionContext} from "@leight-core/leight";
import {Menu as CoolMenu, MenuProps} from "antd";
import React, {FC} from "react";
import {isMobile} from "react-device-detect";

export interface IMenuProps extends Partial<MenuProps> {
	extraOpenKeys?: string[];
}

export const Menu: FC<IMenuProps> = ({extraOpenKeys = [], ...props}) => {
	const menuSelectionContext = useMenuSelectionContext();
	const menuCollapseContext = useMenuCollapseContext();
	return <CoolMenu
		mode={"inline"}
		selectable={true}
		selectedKeys={isMobile ? [] : menuSelectionContext.selection}
		defaultOpenKeys={extraOpenKeys}
		subMenuCloseDelay={0.35}
		inlineCollapsed={menuCollapseContext.collapsed}
		{...props}
	/>;
};
