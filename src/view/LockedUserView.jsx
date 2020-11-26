import { LockOutlined } from "@ant-design/icons";
import {
	Button,
	Result
} from "antd";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../AppContext";
import { useSessionContext } from "../session/SessionContext";

const LockedUserView = () => {
	const sessionContext = useSessionContext();
	const {t}            = useTranslation();
	useAppContext().useTitle("error.user-locked.title");
	return (
		<Result
			status={"error"}
			icon={<LockOutlined/>}
			title={t("error.user-locked.title")}
			subTitle={t("error.user-locked.body")}
			extra={<Button type="primary" onClick={() => sessionContext.close()} children={t("error.user-locked.dismiss")}/>}
		/>
	);
};

export default LockedUserView;
