import {useDrawerContext} from "@leight-core/leight";
import {Button, ButtonProps} from "antd";
import {FC} from "react";

export interface IDrawerButtonProps extends Partial<ButtonProps> {
	/**
	 * Optional drawer width.
	 */
	width?: number;
}

/**
 * Default Antd button without any preset; just the drawer is shown on click.
 */
export const DrawerButton: FC<IDrawerButtonProps> = ({children, width, ...props}) => {
	const drawerContext = useDrawerContext();
	return <Button
		onClick={() => drawerContext.display(children, width)}
		{...props}
	/>;
};
