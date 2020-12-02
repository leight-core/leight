import {Button, Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";

export interface ISignedOutView {
	/**
	 * Target href to redirect.
	 */
	link: string
}

export const SignedOutView: FC<ISignedOutView> = ({link}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<Card>
			<Result
				status="success"
				title={t("common.sign-out.succeed.title")}
				subTitle={t("common.sign-out.succeed.subtitle")}
				extra={
					<Button type="primary" key="continue">
						<Link to={link}>{t("common.sign-out.continue")}</Link>
					</Button>
				}
			/>
		</Card>
	);
};
