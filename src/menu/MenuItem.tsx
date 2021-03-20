import {Menu, MenuItemProps} from "antd";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useCleverLink} from "../hook/useCleverLink";
import {IParams} from "../interface/interface";
import {useParamContext} from "../param/ParamContext";

export interface IMenuItemProps extends Partial<MenuItemProps> {
	/**
	 * Menu ID used for translations, link and others.
	 */
	id: string
	/**
	 * Menu icon
	 */
	icon: ReactNode
	/**
	 * Optional href (link id) if id should not be used.
	 */
	href?: string
	/**
	 * Optional params for link generator.
	 */
	params?: IParams
}

export const MenuItem: FC<IMenuItemProps> = ({id, icon, href, params, ...props}) => {
	const paramContext = useParamContext();
	const {t} = useTranslation();
	const cleverLink = useCleverLink(href || id, {...paramContext.params, ...params});
	return (
		<Menu.Item icon={icon} key={id} {...props} disabled={!cleverLink.enable}>
			<Link to={cleverLink.link} children={t(id + ".menu")}/>
		</Menu.Item>
	);
};

/**
 * Because MenuItem component **must have** a key which is duplicate with an ID (as a key is not possible to read),
 * this function let's user create a menu item with just an ID and icon.
 *
 * Basically it has the same behavior as MenuItem component.
 */
export function CreateMenuItem(id: string, icon: ReactNode, params?: IParams) {
	return (
		<MenuItem id={id} key={id} icon={icon} params={params}/>
	);
}
