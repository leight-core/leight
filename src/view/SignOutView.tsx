import {QuestionCircleFilled} from "@ant-design/icons";
import {Card, Divider, Result, Space} from "antd";
import React from "react";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";
import {SessionCloseButton} from "../component/SessionCloseButton";
import {useLayoutContext} from "../layout/LayoutContext";

export const SignOutView = () => {
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	layoutContext.useEnableFullscreen(true, true);
	layoutContext.useMenuSelect(["common.sign-out"]);
	return (
		<Card>
			<Result
				icon={<QuestionCircleFilled/>}
				title={t(`common.sign-out.title`)}
				subTitle={t(`common.sign-out.subtitle`)}
				extra={
					<Space split={<Divider type={"vertical"}/>} size={"large"}>
						<BackLink text={"common.sign-out.button.back"}/>
						<SessionCloseButton text={"common.sign-out.button.sign-out"}/>
					</Space>
				}
			/>
		</Card>
	);
};
