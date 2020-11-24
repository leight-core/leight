import { LockOutlined } from "@ant-design/icons";
import {
	Button,
	Result
} from "antd";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import useSessionContext from "../session/useSessionContext";

const LockedUserView = () => {
	const sessionContext = useSessionContext();
	const {t}            = useTranslation();

	return (
		<>
			<Helmet title={t("error.user-locked.title")}/>
			<Result
				status={"error"}
				icon={<LockOutlined/>}
				title={t("error.user-locked.title")}
				subTitle={t("error.user-locked.body")}
				extra={<Button type="primary" onClick={() => sessionContext.close()} children={t("error.user-locked.dismiss")}/>}
			/>
		</>
	);
};

export default LockedUserView;
