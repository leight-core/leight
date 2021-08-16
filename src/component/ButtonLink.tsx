import {IParams} from "@leight-core/leight";
import {Button, ButtonProps} from "antd";
import Link from "next/link";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";

export interface IButtonLinkProps extends Omit<ButtonProps, "title"> {
	/**
	 * Href goes to generate method (clever link).
	 */
	href: string;
	/**
	 * Title of a button.
	 */
	title?: string | null;
	/**
	 * Optional params for the link generator.
	 */
	params?: IParams;
}

export const ButtonLink: FC<IButtonLinkProps> = ({href, title, params, ...props}) => {
	const {t} = useTranslation();
	try {
		return <Link href={{pathname: href, query: params}} passHref>
			<Button
				type={"primary"}
				{...props}
			>
				{title ? t(title) : null}
			</Button>
		</Link>;
	} catch (e) {
		console.warn(`Cannot generate link [${href}] for ButtonLink. Params:`, params, e);
		return (
			<Button
				type={"primary"}
				disabled
				{...props}
			>
				{title ? t(title) : null}
			</Button>
		);
	}
};
