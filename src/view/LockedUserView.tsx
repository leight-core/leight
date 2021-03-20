import {LockOutlined} from "@ant-design/icons";
import {Button, Result} from "antd";
import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {ScrollToTop} from "../component/ScrollToTop";
import {useSessionContext} from "../session/SessionContext";

export const LockedUserView = () => {
	const sessionContext = useSessionContext();
	const {t} = useTranslation();
	return (
		<>
			<Helmet title={t("error.user-locked.title")}/>
			<ScrollToTop/>
			<Result
				status={"error"}
				icon={<LockOutlined/>}
				title={t("error.user-locked.title")}
				subTitle={t("error.user-locked.body")}
				extra={<Button size={"large"} type="primary" onClick={() => sessionContext.events.handler("logout")()} children={t("error.user-locked.dismiss")}/>}
			/>
		</>
	);
};
