import {SettingFilled} from "@ant-design/icons";
import {Spin} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ILoader {
	isLoading: boolean
}

export const Loader: FC<ILoader> = (
	{
		isLoading,
		children
	}) => {
	const {t} = useTranslation();
	return (
		<Spin indicator={<SettingFilled spin/>} spinning={isLoading} tip={t("common.spinner") as string} children={children}/>
	);
};
