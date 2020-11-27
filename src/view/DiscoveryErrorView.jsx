import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";

const DiscoveryErrorView = () => {
	const {t} = useTranslation();
	useAppContext().useTitle("error.discovery.title");
	return (
		<Result
			status="500"
			title={t("error.discovery.title")}
			subTitle={t("error.discovery.body")}
			extra={<Button type="primary" onClick={() => window.location.reload()} children={t("common.refresh")}/>}
		/>
	);
};

export default DiscoveryErrorView;
