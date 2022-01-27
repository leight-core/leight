import {useMenuContext} from "@leight-core/leight";
import {Menu as CoolMenu, MenuProps} from "antd";
import {useRouter} from "next/router";
import React, {FC} from "react";
import {isMobile} from "react-device-detect";

export interface IMenuProps extends Partial<MenuProps> {
	extraOpenKeys?: string[];
}

export const Menu: FC<IMenuProps> = ({extraOpenKeys = [], ...props}) => {
	const menuContext = useMenuContext();
	const router = useRouter();

	const keys = (() => {
		const current: string[] = [];
		const items: string[] = [];
		router.route.substr(1).split("/").forEach(item => {
			current.push(item);
			items.push(current.join("."));
			items.push("/" + current.join("/"));
		});
		return items.sort();
	})();

	return <CoolMenu
		mode={"inline"}
		selectable={true}
		selectedKeys={isMobile ? [] : [router.route].concat(menuContext.current)}
		defaultOpenKeys={keys.concat(extraOpenKeys)}
		subMenuCloseDelay={0.35}
		inlineCollapsed={menuContext.collapsed}
		{...props}
	/>;
};
