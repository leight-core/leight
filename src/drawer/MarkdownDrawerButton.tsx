import {Button, ButtonProps} from "antd";
import {FC} from "react";
import {useDrawerContext} from "./DrawerContext";

export interface IMarkdownDrawerButtonProps extends Partial<ButtonProps> {
	/**
	 * Markdown content to show.
	 */
	markdown: string
}

export const MarkdownDrawerButton: FC<IMarkdownDrawerButtonProps> = ({markdown, ...props}) => {
	const drawerContext = useDrawerContext();
	return (
		<Button
			onClick={() => drawerContext.markdown(markdown)}
			{...props}
		/>
	);
};
