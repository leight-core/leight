import {Menu} from "antd";
import React, {FC} from "react";
import {useMenuContext} from "./MenuContext";

export interface IBaseMenu {
}

export const BaseMenu: FC<IBaseMenu> = ({children}) => {
    const menuContext = useMenuContext();
    return (
        <Menu
            mode="inline"
            selectable={true}
            selectedKeys={menuContext.current}
            style={{height: "100vh"}}
            children={children}
        />
    );
};
