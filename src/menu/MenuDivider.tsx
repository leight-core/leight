import {DividerProps, Menu} from "antd";
import React, {FC} from "react";

export interface IMenuDividerProps extends Partial<DividerProps> {
}

export const MenuDivider: FC<IMenuDividerProps> = props => {
	return <Menu.Divider {...props}/>;
};
