import {Button} from "antd";
import {ButtonProps} from "antd/lib/button";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";

export interface ISessionCloseButton extends Partial<ButtonProps> {
	/**
	 * Text on the button, goes through translation.
	 */
	text: string
}

export const SessionCloseButton: FC<ISessionCloseButton> = (
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
			{...props}
		/>
	);
};
