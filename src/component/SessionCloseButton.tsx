import {Button, ButtonProps} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {SignOutIcon} from "../icon/SignOutIcon";

export interface ISessionCloseButtonProps extends Partial<ButtonProps> {
	/**
	 * Text on the button, goes through translation.
	 */
	text: string
}

export const SessionCloseButton: FC<ISessionCloseButtonProps> = (
	{
		text,
		...props
	}) => {
	const appContext = useAppContext();
	const {t} = useTranslation();
	return (
		<Button
			type={"primary"}
			onClick={() => appContext.logout()} children={t(text)}
			icon={<SignOutIcon/>}
			{...props}
		/>
	);
};
