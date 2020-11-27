import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";

const LanguageErrorView = () => {
	const {t} = useTranslation();
	useAppContext().useTitle("error.language.title");
	return (
		<Result
			status="500"
			title={t("error.language.title")}
			subTitle={t("error.language.body")}
			extra={<Button type="primary" onClick={() => window.location.reload()} children={t("common.refresh")}/>}
		/>
	);
};

export default LanguageErrorView;
