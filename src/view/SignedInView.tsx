import {Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {ButtonLink} from "../component/ButtonLink";
import {ContinueIcon} from "../icon/ContinueIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {generate} from "../router/router";

export interface ISignedInViewProps {
	/**
	 * Target href (on continue); internally uses {@see generate}.
	 */
	href: string
}

export const SignedInView: FC<ISignedInViewProps> = ({href}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<Card>
			<Result
				status={"success"}
				title={t(`common.sign-in.succeed.title`)}
				subTitle={t(`common.sign-in.succeed.subtitle`)}
				extra={
					<ButtonLink href={href} icon={<ContinueIcon/>} title={"common.sign-in.continue"}/>
				}
			/>
		</Card>
	);
};
