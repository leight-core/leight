import {Menu} from "antd";
import {MenuItemProps} from "antd/lib/menu/MenuItem";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useCleverLink} from "../hook/useCleverLink";

export interface IMenuItem extends Partial<MenuItemProps> {
	id: string
	icon: JSX.Element
	href: string
}

export const MenuItem: FC<IMenuItem> = ({id, icon, href, ...props}) => {
	const {t} = useTranslation();
	const link = useCleverLink(href);
	return (
		<Menu.Item icon={icon} {...props} disabled={!link.enable}>
			<Link to={link.link} children={t(id + ".menu")}/>
		</Menu.Item>
	);
};
