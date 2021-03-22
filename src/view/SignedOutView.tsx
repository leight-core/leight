import {Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {ButtonLink} from "../component/ButtonLink";
import {ScrollToTop} from "../component/ScrollToTop";
import {ContinueIcon} from "../icon/ContinueIcon";
import {useLayoutContext} from "../layout/LayoutContext";

export interface ISignedOutViewProps {
	/**
	 * Target href to redirect; internally uses {@see generate}.
	 */
	href: string
}

export const SignedOutView: FC<ISignedOutViewProps> = ({href}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullwidth(true, true);
	return (
		<Card>
			<ScrollToTop/>
			<Result
				status="success"
				title={t("common.sign-out.succeed.title")}
				subTitle={t("common.sign-out.succeed.subtitle")}
				extra={
					<ButtonLink size={"large"} href={href} icon={<ContinueIcon/>} title={"common.sign-out.continue"}/>
				}
			/>
		</Card>
	);
};
