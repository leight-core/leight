import {Drawer, DrawerContext, DrawerProvider, PlacementType, useIsMobile} from "@leight-core/leight";
import {Button, ButtonProps, DrawerProps} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IDrawerButtonProps extends Partial<ButtonProps> {
	label?: ReactNode;
	title?: string;
	/**
	 * Optional drawer width.
	 */
	width?: number;
	drawerProps?: DrawerProps;
	placement?: PlacementType;
}

/**
 * Default Antd button without any preset; just the drawer is shown on click.
 */
export const DrawerButton: FC<IDrawerButtonProps> = ({children, label, title, width = 600, placement, drawerProps, ...props}) => {
	const {t} = useTranslation();
	const isMobile = useIsMobile();
	return <DrawerProvider>
		<DrawerContext.Consumer>
			{drawerContext => <>
				<Drawer
					title={title ? t(title) : null}
					width={isMobile ? "100vw" : width}
					headerStyle={isMobile ? {padding: "8px 4px"} : undefined}
					bodyStyle={{overflowY: "scroll", padding: isMobile ? "4px" : undefined}}
					placement={placement}
					{...drawerProps}
				>
					{children}
				</Drawer>
				<Button
					onClick={() => drawerContext.setVisible(true)}
					{...props}
				>
					{title ? t(title) : label}
				</Button>
			</>}
		</DrawerContext.Consumer>
	</DrawerProvider>;
};
