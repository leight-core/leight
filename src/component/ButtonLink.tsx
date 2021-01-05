import {Button} from "antd";
import {ButtonProps} from "antd/lib/button";
import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
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
}

export const ButtonLink = ({href, title, ...props}) => {
	const {t} = useTranslation();
	const routerContext = useRouterContext();
	return (
		<Link to={routerContext.generate(href)}>
			<Button type={"primary"} children={t(title)} {...props}/>
		</Link>
	);
};
