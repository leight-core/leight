import {Menu as CoolMenu, MenuProps} from "antd";
import React, {FC} from "react";
import {useMenuContext} from "./MenuContext";

export interface IMenuProps extends Partial<MenuProps> {
}

export const Menu: FC<IMenuProps> = props => {
	const menuContext = useMenuContext();
	return <CoolMenu
		mode={"inline"}
		selectable={true}
		selectedKeys={menuContext.current}
		{...props}
	/>;
};
