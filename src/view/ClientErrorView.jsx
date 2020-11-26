import {
	Button,
	Result
} from "antd";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../AppContext";

const ClientErrorView = () => {
	const {t} = useTranslation();
	useAppContext().useTitle("error.client.title");
	return (
		<Result
			status={"500"}
			title={t("error.client.title")}
			subTitle={t("error.client.body")}
			extra={<Button type="primary" onClick={() => window.location.reload()}>{t("common.refresh")}</Button>}
		/>
	);
};

export default ClientErrorView;
