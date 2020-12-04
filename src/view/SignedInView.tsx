import {Button, Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";
import {generate} from "../router/router";

export interface ISignedInView {
	/**
	 * Target href (on continue); internally uses {@see generate}.
	 */
	href: string
}

export const SignedInView: FC<ISignedInView> = ({href}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<Card>
			<Result
				status={"success"}
				title={t(`common.succeed.title`)}
				subTitle={t(`common.succeed.subtitle`)}
				extra={[
					<Button type="primary" key="continue">
						<Link to={generate(href)}>{t(`common.continue`)}</Link>
					</Button>
				]}
			/>
		</Card>
	);
};
