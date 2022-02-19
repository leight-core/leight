import {MenuOutlined} from "@ant-design/icons";
import {DrawerButton, IDrawerButtonProps, PlacementType, useIsMobile} from "@leight-core/leight";
import {Menu} from "antd";
import {FC, ReactNode} from "react";

export interface IDrawerMenuProps extends Partial<IDrawerButtonProps> {
	header?: ReactNode;
	placement?: PlacementType;
}

export const DrawerMenu: FC<IDrawerMenuProps> = ({children, header, placement, ...props}) => {
	const isMobile = useIsMobile();
	return <DrawerButton
		type={"text"}
		drawerProps={{
			title: header,
			headerStyle: isMobile ? {padding: "8px 4px"} : undefined,
			bodyStyle: {padding: 0},
			placement,
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
