import {Button, ButtonProps} from "antd";
import {FC, ReactNode} from "react";
import {useDrawerContext} from "./DrawerContext";

export interface IDrawerButtonProps extends Partial<ButtonProps> {
	/**
	 * Content to show.
	 */
	content: ReactNode
}

/**
 * Default Antd button without any preset; just the drawer is shown on click.
 */
export const DrawerButton: FC<IDrawerButtonProps> = ({content, ...props}) => {
	const drawerContext = useDrawerContext();
	return (
		<Button
			onClick={() => drawerContext.display(content)}
			{...props}
		/>
	);
};