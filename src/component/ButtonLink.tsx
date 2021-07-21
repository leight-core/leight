import {Button, ButtonProps} from "antd";
import Link from "next/link";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {IParams} from "../link/interface";
import {useLinkContext} from "../link/LinkContext";

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
	const iLinkGeneratorContext = useLinkContext();
	try {
		return <Link href={iLinkGeneratorContext.generate(href, params)}>
			<Button
				type={"primary"}
				children={title ? t(title) : null}
				{...props}
			/>
		</Link>;
	} catch (e) {
		console.warn(`Cannot generate link [${href}] for ButtonLink. Params:`, params, e);
		return (
			<Button
				type={"primary"}
				children={title ? t(title) : null}
				disabled
				{...props}
			/>
		);
	}
};
