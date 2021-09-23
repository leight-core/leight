import {useDrawerContext} from "@leight-core/leight";
import {Button, ButtonProps, Tooltip} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export interface IDrawerButtonProps extends Partial<ButtonProps> {
	label?: ReactNode;
	title?: string;
	/**
	 * Optional drawer width.
	 */
	width?: number;
	tooltip?: string;
}

/**
 * Default Antd button without any preset; just the drawer is shown on click.
 */
export const DrawerButton: FC<IDrawerButtonProps> = ({children, label, title, tooltip, width, ...props}) => {
	const drawerContext = useDrawerContext();
	const {t} = useTranslation();

	const ButtonInternal = () => {
		return <Button
			onClick={() => drawerContext.display(children, width)}
			{...props}
		>
			{title ? t(title) : label}
		</Button>;
	};

	return tooltip ? <Tooltip title={t(tooltip)}><ButtonInternal/></Tooltip> : <ButtonInternal/>;
};
