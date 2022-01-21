import {Drawer, DrawerContext, DrawerContextProvider} from "@leight-core/leight";
import {Button, ButtonProps} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IDrawerButtonProps extends Partial<ButtonProps> {
	label?: ReactNode;
	title?: string;
	/**
	 * Optional drawer width.
	 */
	width?: number;
}

/**
 * Default Antd button without any preset; just the drawer is shown on click.
 */
export const DrawerButton: FC<IDrawerButtonProps> = ({children, label, title, width, ...props}) => {
	const {t} = useTranslation();
	return <DrawerContextProvider>
		<DrawerContext.Consumer>
			{drawerContext => <>
				<Drawer
					title={title ? t(title) : null}
					width={width || 450}
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
	</DrawerContextProvider>;
};
