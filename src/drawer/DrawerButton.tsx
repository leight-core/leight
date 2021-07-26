import {Button, ButtonProps} from "antd";
import {FC, ReactNode} from "react";
import {useDrawerContext} from "./DrawerContext";

export interface IDrawerButtonProps extends Partial<ButtonProps> {
	/**
	 * Content to show.
	 */
	content: ReactNode;
	/**
	 * Optional drawer width.
	 */
	width?: number;
}

/**
 * Default Antd button without any preset; just the drawer is shown on click.
 */
export const DrawerButton: FC<IDrawerButtonProps> = ({content, width, ...props}) => {
	const drawerContext = useDrawerContext();
	return <Button
		onClick={() => drawerContext.display(content, width)}
		{...props}
	/>;
};
