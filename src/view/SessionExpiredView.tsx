import {Button, Card, Result} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";
import {generate} from "../router/router";

export interface ISessionExpiredView {
	/**
	 * Where to redirect on continue; href goes through {@see generate} method.
	 */
	href: string
}

export const SessionExpiredView: FC<ISessionExpiredView> = ({href}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<Card>
			<Result
				status={"403"}
				title={t("common.session-expired.title")}
				subTitle={t("common.session-expired.subtitle")}
				extra={
					<Link
						to={generate(href)}
						children={
							<Button
								type={"primary"}
								children={t("common.session-expired.continue")}
							/>
						}
					/>
				}
			/>
		</Card>
	);
};
