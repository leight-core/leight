import {Menu} from "antd";
import {MenuItemGroupProps} from "rc-menu/lib/MenuItemGroup";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";

export interface IMenuGroup extends Partial<MenuItemGroupProps> {
	id: string
}

export const MenuGroup: FC<IMenuGroup> = (
	{
		id,
		...props
	}) => {
	const {t} = useTranslation();
	return (
		<Menu.ItemGroup key={id} title={t(id + ".menu")} {...props}/>
	);
};
