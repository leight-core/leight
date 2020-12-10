import {Menu} from "antd";
import {DividerProps} from "antd/lib/divider";
import React from "react";

export interface IMenuDividerProps extends Partial<DividerProps> {
}

export const MenuDivider = (props) => {
	return (
		<Menu.Divider {...props}/>
	);
};
