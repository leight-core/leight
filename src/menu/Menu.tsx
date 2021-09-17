import {useMenuContext} from "@leight-core/leight";
import {Menu as CoolMenu, MenuProps} from "antd";
import {useRouter} from "next/router";
import React, {FC, useEffect, useState} from "react";

export interface IMenuProps extends Partial<MenuProps> {
}

export const Menu: FC<IMenuProps> = props => {
	const menuContext = useMenuContext();
	const [items, setItems] = useState<string[]>([]);
	const router = useRouter();

	useEffect(() => {
		const current: string[] = [];
		const selected: string[] = [];
		router.route.substr(1).split("/").forEach(item => {
			current.push(item);
			selected.push(current.join("."));
		});
		setItems(selected);
	}, [router.route]);

	return <CoolMenu
		mode={"inline"}
		selectable={true}
		selectedKeys={menuContext.current}
		defaultOpenKeys={items}
		{...props}
	/>;
};
