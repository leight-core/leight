import {Button, ButtonProps} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {BackIcon} from "../icon/BackIcon";

export interface IBackLinkProps extends Partial<ButtonProps> {
	/**
	 * Text on the button, goes through translation.
	 */
	text?: string
}

/**
 * Just a simple back button using react-router under hood to navigate one history entry back.
 *
 * Props are passed to underlying Button.
 *
 * See:
 *
 * - https://ant.design/components/button/
 */
export const BackLink: FC<IBackLinkProps> = (
	{
		text,
		...props
	}) => {
	const navigate = useNavigate();
	const {t} = useTranslation();
	return (
		<Button
			type={"link"}
			size={"small"}
			icon={<BackIcon/>}
			onClick={() => navigate(-1)}
			children={text ? t(text) : null}
			{...props}
		/>
	);
};
