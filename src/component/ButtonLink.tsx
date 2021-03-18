import {Button, ButtonProps} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {Link} from "react-router-dom";
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
			<Link to={routerContext.generate(href, {...layoutContext.data, ...params})}>
				<Button type={"primary"} children={title ? t(title) : null} {...props}/>
			</Link>
		);
	} catch (e) {
		console.warn(`Cannot generate link [${href}] for ButtonLink. Params:`, params, e);
		return (
			<Link to={""}>
				<Button type={"primary"} children={title ? t(title) : null} disabled {...props}/>
			</Link>
		);
	}
};
