import {MenuOutlined} from "@ant-design/icons";
import {DrawerButton, IDrawerButtonProps} from "@leight-core/leight";
import {Menu} from "antd";
import {FC, ReactNode} from "react";

export interface IDrawerMenuProps extends Partial<IDrawerButtonProps> {
	header?: ReactNode;
}

export const DrawerMenu: FC<IDrawerMenuProps> = ({children, header, ...props}) => {
	return <DrawerButton
		type={"text"}
		drawerProps={{
			title: header,
			bodyStyle: {padding: 0}
		}}
		width={400}
		icon={<MenuOutlined/>}
		{...props}
	>
		<Menu selectable={false}>
			{children}
		</Menu>
	</DrawerButton>;
};
