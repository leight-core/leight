import {Button} from "antd";
import {ButtonProps} from "antd/lib/button";
import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {generate} from "../router/router";

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
	return (
		<Link to={generate(href)}>
			<Button type={"primary"} children={t(title)} {...props}/>
		</Link>
	);
};
