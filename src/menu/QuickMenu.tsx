import {MoreOutlined} from "@ant-design/icons";
import {Dropdown, DropDownProps, Menu} from "antd";
import {FC, ReactNode} from "react";

export interface IQuickMenuProps extends Partial<DropDownProps> {
	icon?: ReactNode;
}

export const QuickMenu: FC<IQuickMenuProps> = ({icon = <MoreOutlined/>, children, ...props}) => {
	return <Dropdown
		trigger={["click"]}
		overlay={() => <Menu>{children}</Menu>}
		arrow
		{...props}
	>
		{icon}
	</Dropdown>;
};
