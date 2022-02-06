import {useMenuCollapseContext, useMenuSelectionContext} from "@leight-core/leight";
import {Menu as CoolMenu, MenuProps} from "antd";
import {useRouter} from "next/router";
import React, {FC} from "react";
import {isMobile} from "react-device-detect";

export interface IMenuProps extends Partial<MenuProps> {
	extraOpenKeys?: string[];
}

export const Menu: FC<IMenuProps> = ({extraOpenKeys = [], ...props}) => {
	const menuSelectionContext = useMenuSelectionContext();
	const menuCollapseContext = useMenuCollapseContext();
	const router = useRouter();

	const keys = (() => {
		const current: string[] = [];
		const items: string[] = [];
		router.route.substring(1).split("/").forEach(item => {
			current.push(item);
			items.push(current.join("."));
			items.push("/" + current.join("/"));
		});
		return items.sort();
	})();

	return <CoolMenu
		mode={"inline"}
		selectable={true}
		selectedKeys={isMobile ? [] : [router.route].concat(menuSelectionContext.selection)}
		defaultOpenKeys={keys.concat(extraOpenKeys)}
		subMenuCloseDelay={0.35}
		inlineCollapsed={menuCollapseContext.collapsed}
		{...props}
	/>;
};
