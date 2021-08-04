import {Spin} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {LoaderIcon} from "../icon/LoaderIcon";

export interface ILoaderProps {
	isLoading: boolean;
}

export const Loader: FC<ILoaderProps> = (
	{
		isLoading,
		children
	}) => {
	const {t} = useTranslation();
	return <Spin indicator={<LoaderIcon/>} spinning={isLoading} tip={t("common.spinner") as string} children={children}/>;
};
