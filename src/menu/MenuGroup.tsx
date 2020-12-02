import {Menu} from "antd";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";

export const MenuGroup = (
	{
		id,
		...props
	}) => {
	const {t} = useTranslation();
	return (
		<Menu.ItemGroup key={id} title={t(id + ".menu")} {...props}/>
	);
};

MenuGroup.propTypes = {
	id: PropTypes.string.isRequired,
};
