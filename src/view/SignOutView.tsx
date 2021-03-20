import {QuestionCircleFilled} from "@ant-design/icons";
import {Card, Divider, Result, Space} from "antd";
import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {BackLink} from "../component/BackLink";
import {ScrollToTop} from "../component/ScrollToTop";
import {SessionCloseButton} from "../component/SessionCloseButton";
import {useLayoutContext} from "../layout/LayoutContext";
import {useMenuContext} from "../menu/MenuContext";

export const SignOutView = () => {
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	layoutContext.useEnableFullscreen(true, true);
	useMenuContext().useSelect(["common.sign-out"]);
	return (
		<Card>
			<Helmet title={t("common.sign-out.title")}/>
			<ScrollToTop/>
			<Result
				icon={<QuestionCircleFilled/>}
				title={t(`common.sign-out.title`)}
				subTitle={t(`common.sign-out.subtitle`)}
				extra={
					<Space split={<Divider type={"vertical"}/>} size={"large"}>
						<BackLink text={"common.sign-out.button.back"}/>
						<SessionCloseButton size={"large"} text={"common.sign-out.button.sign-out"}/>
					</Space>
				}
			/>
		</Card>
	);
};
