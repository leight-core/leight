import {SettingFilled} from "@ant-design/icons";
import {Spin} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";

export const Loader = (
	{
		isLoading,
		children
	}) => {
	const {t} = useTranslation();
	return (
		<Spin indicator={<SettingFilled spin/>} spinning={isLoading} tip={t("common.spinner")} children={children}/>
	);
};
