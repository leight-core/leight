import { SettingFilled } from "@ant-design/icons";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

const Loader = (
	{
		isLoading,
		children
	}) => {
	const {t} = useTranslation();
	return (
		<Spin indicator={<SettingFilled spin/>} spinning={isLoading} tip={t("common.spinner")} children={children}/>
	);
};

export default Loader;
