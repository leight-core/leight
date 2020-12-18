import {Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {ButtonLink} from "../component/ButtonLink";
import {ScrollToTop} from "../component/ScrollToTop";
import {ContinueIcon} from "../icon/ContinueIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {useModuleContext} from "../module/ModuleContext";
import {generate} from "../router/router";

export interface ISignedInViewProps {
	/**
	 * Target href (on continue); internally uses {@see generate}.
	 */
	href: string
}

export const SignedInView: FC<ISignedInViewProps> = ({href}) => {
	const {t} = useTranslation();
	const moduleContext = useModuleContext();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<Card>
			<ScrollToTop/>
			<Result
				status={"success"}
				title={t([moduleContext.tid("sign-in.succeed.title"), "common.sign-in.succeed.title"])}
				subTitle={t([moduleContext.tid("sign-in.succeed.subtitle"), "common.sign-in.succeed.subtitle"])}
				extra={
					<ButtonLink href={href} icon={<ContinueIcon/>} title={"common.sign-in.continue"}/>
				}
			/>
		</Card>
	);
};
