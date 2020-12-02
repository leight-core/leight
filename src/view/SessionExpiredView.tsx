import {Button, Card, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";

export interface ISessionExpiredView {
	link: string
}

export const SessionExpiredView: FC<ISessionExpiredView> = ({link}) => {
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
						to={link}
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
//
// SessionExpiredView.propTypes = {
// 	/**
// 	 * Target url of redirection.
// 	 */
// 	link: PropTypes.string.isRequired,
// };
