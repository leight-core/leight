import {Menu} from "antd";
import React, {FC} from "react";
import {useMenuContext} from "./MenuContext";

export interface IBaseMenuProps {
}

export const BaseMenu: FC<IBaseMenuProps> = ({children}) => {
	const menuContext = useMenuContext();
	return (
		<Menu
			mode={"inline"}
			selectable={true}
			selectedKeys={menuContext.current}
			style={{height: "100vh"}}
			children={children}
		/>
	);
};
