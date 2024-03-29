import {BackIcon} from "@leight-core/leight";
import {Button, ButtonProps} from "antd";
import {useRouter} from "next/router";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface IBackLinkProps extends Partial<ButtonProps> {
	/**
	 * Text on the button, goes through translation.
	 */
	text?: string;
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
	const router = useRouter();
	const {t} = useTranslation();
	return <Button
		type={"link"}
		size={"small"}
		icon={<BackIcon/>}
		onClick={() => router.back()}
		{...props}
	>
		{text ? t(text) : null}
	</Button>;
};
