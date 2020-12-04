import {QuestionCircleFilled} from "@ant-design/icons";
import {Card, Result} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";
import {SessionCloseButton} from "../component/SessionCloseButton";
import {useLayoutContext} from "../layout/LayoutContext";

export const SignOutView = () => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<Card>
			<Result
				icon={<QuestionCircleFilled/>}
				title={t(`common.sign-out.title`)}
				subTitle={t(`common.sign-out.subtitle`)}
				extra={[
					<SessionCloseButton key={"sign-out"} text={"common.sign-out.button.sign-out"}/>,
					<BackLink key={"back"} text={"common.sign-out.button.back"}/>
				]}
			/>
		</Card>
	);
};
