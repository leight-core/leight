import {Button, ButtonProps} from "antd";
import {FC} from "react";
import {useDrawerContext} from "./DrawerContext";

export interface IMarkdownDrawerButtonProps extends Partial<ButtonProps> {
	/**
	 * Markdown content to show.
	 */
	markdown: string
	/**
	 * Optional drawer width.
	 */
	width?: number
}

export const MarkdownDrawerButton: FC<IMarkdownDrawerButtonProps> = ({markdown, width, ...props}) => {
	const drawerContext = useDrawerContext();
	return (
		<Button
			onClick={() => drawerContext.markdown(markdown, width)}
			{...props}
		/>
	);
};
