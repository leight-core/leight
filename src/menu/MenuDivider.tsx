import {DividerProps, Menu} from "antd";
import React from "react";

export interface IMenuDividerProps extends Partial<DividerProps> {
}

export const MenuDivider = (props) => {
	return (
		<Menu.Divider {...props}/>
	);
};
