import {Button} from "antd";
import {ButtonProps} from "antd/lib/button";
import React from "react";
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
	title: string
	/**
	 * Optional params for the link generator.
	 */
	params?: Params
}

export const ButtonLink = ({href, title, params, ...props}) => {
	const {t} = useTranslation();
	const routerContext = useRouterContext();
	const layoutContext = useLayoutContext();
	try {
		return (
			<Link to={routerContext.generate(href, {...layoutContext.data, ...params})}>
				<Button type={"primary"} children={t(title)} {...props}/>
			</Link>
		);
	} catch {
		return (
			<Link to={""}>
				<Button type={"primary"} children={t(title)} disabled {...props}/>
			</Link>
		);
	}
};
