import {Button, ButtonProps} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {useLayoutContext} from "../layout/LayoutContext";
import {useRouterContext} from "../router/RouterContext";

export interface IButtonLinkProps extends ButtonProps {
	/**
	 * Href goes to generate method (clever link).
	 */
	href: string
	/**
	 * Title of a button.
	 */
	title?: string
	/**
	 * Optional params for the link generator.
	 */
	params?: Params
}

export const ButtonLink: FC<IButtonLinkProps> = ({href, title, params, ...props}) => {
	const {t} = useTranslation();
	const routerContext = useRouterContext();
	const layoutContext = useLayoutContext();
	try {
		return (
			<Button
				href={routerContext.generate(href, {...layoutContext.data, ...params})}
				type={"primary"}
				children={title ? t(title) : null}
				{...props}
			/>
		);
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
