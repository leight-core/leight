import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../AppContext";

const DiscoveryErrorView = () => {
	const {t} = useTranslation();
	useAppContext().useTitle("error.discovery.title");
	return (
		<Result
			status="500"
			title={t("error.discovery.title")}
			subTitle={t("error.discovery.body")}
			extra={<Button type="primary" onClick={() => window.location.reload()}>{t("common.refresh")}</Button>}
		/>
	);
};

export default DiscoveryErrorView;
