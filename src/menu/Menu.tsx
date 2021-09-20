import {useMenuContext} from "@leight-core/leight";
import {Menu as CoolMenu, MenuProps} from "antd";
import {useRouter} from "next/router";
import React, {FC} from "react";

export interface IMenuProps extends Partial<MenuProps> {
	extraOpenKeys?: string[];
}

export const Menu: FC<IMenuProps> = ({extraOpenKeys = [], ...props}) => {
	const menuContext = useMenuContext();
	const router = useRouter();

	return <CoolMenu
		mode={"inline"}
		selectable={true}
		selectedKeys={menuContext.current}
		defaultOpenKeys={(() => {
			if (menuContext.collapsed) {
				return [];
			}
			const current: string[] = [];
			const items: string[] = [];
			router.route.substr(1).split("/").forEach(item => {
				current.push(item);
				items.push(current.join("."));
			});
			return items.concat(extraOpenKeys);
		})()}
		subMenuCloseDelay={0.35}
		{...props}
	/>;
};
