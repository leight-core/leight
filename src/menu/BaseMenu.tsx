import {Menu} from "antd";
import React, {FC} from "react";
import {useLayoutContext} from "../layout/LayoutContext";

export interface IBaseMenu {
}

export const BaseMenu: FC<IBaseMenu> = ({children}) => {
	const layoutContext = useLayoutContext();
	if (!layoutContext) {
		throw new Error("Base menu must be used under LayoutContext (use for example BaseLayout component).");
	}
	return (
		<Menu
			mode="inline"
			selectable={true}
			selectedKeys={layoutContext.selectMenu}
			style={{height: "100vh"}}
			children={children}
		/>
	);
};
