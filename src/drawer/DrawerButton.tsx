import {Drawer, DrawerContext, DrawerProvider} from "@leight-core/leight";
import {Button, ButtonProps, DrawerProps} from "antd";
import {FC, ReactNode} from "react";
import {isMobile} from "react-device-detect";
import {useTranslation} from "react-i18next";

export interface IDrawerButtonProps extends Partial<ButtonProps> {
	label?: ReactNode;
	title?: string;
	/**
	 * Optional drawer width.
	 */
	width?: number;
	drawerProps?: DrawerProps;
}

/**
 * Default Antd button without any preset; just the drawer is shown on click.
 */
export const DrawerButton: FC<IDrawerButtonProps> = ({children, label, title, width = 600, drawerProps, ...props}) => {
	const {t} = useTranslation();
	return <DrawerProvider>
		<DrawerContext.Consumer>
			{drawerContext => <>
				<Drawer
					title={title ? t(title) : null}
					width={isMobile ? "100vw" : width}
					bodyStyle={{overflowY: "scroll", padding: isMobile ? "4px" : undefined}}
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
