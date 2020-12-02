import {Button, Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";

export interface ISignedInView {
	/**
	 * Target href (on continue).
	 */
	link: string
}

export const SignedInView: FC<ISignedInView> = ({link}) => {
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
						<Link to={link}>{t(`common.continue`)}</Link>
					</Button>
				]}
			/>
		</Card>
	);
};
