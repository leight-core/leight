import {Button, Card, Result} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";

const SessionExpiredView = ({link}) => {
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	layoutContext.useEnableFullscreen();
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

SessionExpiredView.propTypes = {
	/**
	 * Target url of redirection.
	 */
	link: PropTypes.string.isRequired,
};

export default SessionExpiredView;
