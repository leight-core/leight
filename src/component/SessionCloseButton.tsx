import {SignOutIcon, useSessionContext} from "@leight-core/leight";
import {Button, ButtonProps} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ISessionCloseButtonProps extends Partial<ButtonProps> {
	/**
	 * Text on the button, goes through translation.
	 */
	text: string;
}

export const SessionCloseButton: FC<ISessionCloseButtonProps> = (
	{
		text,
		...props
	}) => {
	const sessionContext = useSessionContext();
	const {t} = useTranslation();
	return <Button
		type={"primary"}
		onClick={() => sessionContext.events.handler("logout")()} children={t(text)}
		icon={<SignOutIcon/>}
		{...props}
	/>;
};
