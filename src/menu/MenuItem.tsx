import {Menu, MenuItemProps} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Params} from "react-router";
import {Link} from "react-router-dom";
import {useCleverLink} from "../hook/useCleverLink";

export interface IMenuItemProps extends Partial<MenuItemProps> {
	/**
	 * Menu ID used for translations, link and others.
	 */
	id: string
	/**
	 * Menu icon
	 */
	icon: JSX.Element
	/**
	 * Optional href (link id) if id should not be used.
	 */
	href?: string
	/**
	 * Optional params for link generator.
	 */
	params?: Params
}

export const MenuItem: FC<IMenuItemProps> = ({id, icon, href, params, ...props}) => {
	const {t} = useTranslation();
	const cleverLink = useCleverLink(href || id, params);
	return (
		<Menu.Item icon={icon} {...props} disabled={!cleverLink.enable}>
			<Link to={cleverLink.link} children={t(id + ".menu")}/>
		</Menu.Item>
	);
};
