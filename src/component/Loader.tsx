import {LoaderIcon} from "@leight-core/leight";
import {Spin} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";

export interface ILoaderProps {
	isLoading: boolean;
}

export const Loader: FC<ILoaderProps> = (
	{
		isLoading,
		children,
	}) => {
	const {t} = useTranslation();
	return <Spin indicator={<LoaderIcon/>} spinning={isLoading} tip={t("common.spinner") as string}>
		{children}
	</Spin>;
};
