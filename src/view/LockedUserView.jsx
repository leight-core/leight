import {LockOutlined} from "@ant-design/icons";
import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";

export const LockedUserView = () => {
	const appContext = useAppContext();
	const {t} = useTranslation();
	appContext.useTitle("error.user-locked.title");
	return (
		<Result
			status={"error"}
			icon={<LockOutlined/>}
			title={t("error.user-locked.title")}
			subTitle={t("error.user-locked.body")}
			extra={<Button type="primary" onClick={() => appContext.logout()} children={t("error.user-locked.dismiss")}/>}
		/>
	);
};
