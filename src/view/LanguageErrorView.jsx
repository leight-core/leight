import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../AppContext";

const LanguageErrorView = () => {
	const {t} = useTranslation();
	useAppContext().useTitle("error.language.title");
	return (
		<Result
			status="500"
			title={t("error.language.title")}
			subTitle={t("error.language.body")}
			extra={<Button type="primary" onClick={() => window.location.reload()}>{t("common.refresh")}</Button>}
		/>
	);
};

export default LanguageErrorView;
